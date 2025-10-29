import { Document, DocumentStore } from "@rbxts/document-service";
import { DataStoreService, HttpService, MessagingService, Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Remotes, Util } from "shared/module";

const empowerWall = Workspace.EmpowerWall;
const zPos = empowerWall.Position.Z + 0.1;

class Bush {
    private position: Vector2;

    public constructor(position: Vector2){
        const bush = ReplicatedStorage.bush.Clone();
        bush.Parent = Workspace;
        const yPos = bush.GetPivot().Position.Y;
        const pivot = new CFrame(position.X, yPos, position.Y);
        bush.PivotTo(pivot);

        this.position = position;
    }

    public static createNewBush(): Bush{
        return new Bush(new Vector2(math.random(0, 50), math.random(0, 50)));
    }

    public serialize(): SerializedBush{
        const pos = HttpService.JSONEncode({x: this.position.X, z: this.position.Y});
        return {position: pos};
    }

    public static deserialize(bush: SerializedBush): Bush{
        const pos = HttpService.JSONDecode(bush.position) as {x: number, z: number};
        const posVector = new Vector2(pos.x, pos.z);
        return new Bush(posVector);
    }
}

class Bushes {
    private cachedBushes: Map<string, Bush>;
    private pendingBushes: Map<string, Bush>;
    private store: DocumentStore<BushDatas>;
    private global: Document<BushDatas>;

    public constructor(){
        this.cachedBushes = new Map();
        this.pendingBushes = new Map();
        this.store = new DocumentStore<BushDatas>({
                dataStore: DataStoreService.GetDataStore((Util.isTestingServer() ? "Testing" : "Production") + " - Bushes"),
                check: (data) => true,
                default: new Map(),
                migrations: [
                    {
                        backwardsCompatible: false,
                        migrate: (data) => {

                        }
                    }
                ],
                lockSessions: false,
                bindToClose: undefined
            })
        this.global = this.store.GetDocument("Global")[0];

        this.updateCache();

        MessagingService.SubscribeAsync((Util.isTestingServer() ? "Testing" : "Production") + " - UpdatedBushes", (message) => {
            let bushes = message.Data as BushDatas;
            print("Received Bushes: ", bushes);
            let newOne = false;
            bushes.forEach((serializedBush, uuid) => {
                if(!this.cachedBushes.has(uuid)){
                    newOne = true;
                    let deserialized = Bush.deserialize(serializedBush)
                    this.cachedBushes.set(uuid, deserialized);
                }
            });
            if(newOne)
                Remotes.getPlaySound().FireAllClients();
        });
    }


    private updateCache(){

        this.global.Open();

        if(!this.pendingBushes.isEmpty()){
            const serializedPendingBushes = new Map<string, SerializedBush>();
            this.pendingBushes.forEach((msg, key) => serializedPendingBushes.set(key, msg.serialize()));

            let updateResult = this.global.Update(transform => {
                serializedPendingBushes.forEach((bush, key) => {
                    transform.set(key, bush);
                });
                return transform;
            });

            if(updateResult.success){
                MessagingService.PublishAsync((Util.isTestingServer() ? "Testing" : "Production") + " - UpdatedBushes", serializedPendingBushes);
                this.pendingBushes.clear();
            }
        }

        let result = this.global.Read(); 
        if(result.success){
            let data = result.data;
            data.forEach((serializedBush, uuid) => {
                if(!this.cachedBushes.has(uuid)){
                    let deserialized = Bush.deserialize(serializedBush);
                    this.cachedBushes.set(uuid, deserialized);
                }
            });
        }

        this.global.Close();

        print("Updated Bush Cache: ", this.cachedBushes);
    }

    public addBush(bush: Bush): string {
        const uuid = HttpService.GenerateGUID(false);
        this.pendingBushes.set(uuid, bush);
        this.cachedBushes.set(uuid, bush);
        Remotes.getPlaySound().FireAllClients();
        this.updateCache();
        return uuid;
    }
}

class Message {
    private creator: number;
    private content: string;
    private position: Vector2;
    private version: number;
    private toDelete: boolean;
    private color: Color3;
    private stickyNote: ReplicatedStorage["StickyNote"];

    public constructor(player: number, content: string, position: Vector2, color: Color3 | undefined = undefined, version:number = 0){
        this.creator = player;
        this.content = content;
        this.position = position;
        this.version = version;
        this.toDelete = false;

        this.stickyNote = ReplicatedStorage.StickyNote.Clone();
        this.stickyNote.Anchored = true;
        this.stickyNote.Position = new Vector3(position.X, position.Y, zPos);
        this.stickyNote.Parent = Workspace;
        this.stickyNote.SurfaceGui.Frame.TextBox.Text = content;
        this.stickyNote.Color = color || Color3.fromRGB(math.random(100, 255), math.random(100, 255), math.random(100, 255))
        this.color = this.stickyNote.Color;
    }

    public setForDeletion(toDelete: boolean){
        this.toDelete = toDelete;
    }

    public shouldBeDeleted(){
        return this.toDelete;
    }

    public destroy(){
        this.stickyNote.Destroy();
    }

    public setContent(content: string){
        this.content = content;
        this.stickyNote.SurfaceGui.Frame.TextBox.Text = content;
    }

    public incrementVersion(){
        this.version++;
    }

    public compareVersions(message: SerializedMessage){
        return this.version > message.version;
    }

    public getContent(){
        return this.content;
    }

    public getCreator(): Player | undefined {
        return Players.GetPlayerByUserId(this.creator);
    }

    public getCreatorID(){
        return this.creator;
    }

    public static deserialize(data: SerializedMessage){
        const decodedPosition = HttpService.JSONDecode(data.position) as {x: number, y: number};
        const decodedColor = HttpService.JSONDecode(data.color) as {r: number, g: number, b: number};
        return new Message(
            data.creator,
            data.content,
            new Vector2(decodedPosition.x, decodedPosition.y),
            new Color3(decodedColor.r, decodedColor.g, decodedColor.b),
            data.version
        )
    }

    public serialize(): SerializedMessage {
        return {
            creator: this.creator,
            content: this.content,
            position: HttpService.JSONEncode({x: this.position.X, y: this.position.Y}),
            color: HttpService.JSONEncode({r: this.color.R, g: this.color.G, b: this.color.B}),
            version: this.version,
            toDelete: this.toDelete
        }
    }
}

class Messages {
    private cachedMessages: Map<string, Message>;
    private pendingMessages: Map<string, Message>;
    private store: DocumentStore<MessageDatas>;
    private global: Document<MessageDatas>;

    public constructor(){
        this.cachedMessages = new Map();
        this.pendingMessages = new Map();
        this.store = new DocumentStore<MessageDatas>({
                dataStore: DataStoreService.GetDataStore((Util.isTestingServer() ? "Testing" : "Production") + " - Posts"),
                check: (data) => true,
                default: new Map(),
                migrations: [
                    {
                        backwardsCompatible: false,
                        migrate: (data) => {

                        }
                    }
                ],
                lockSessions: false,
                bindToClose: undefined
            })
        this.global = this.store.GetDocument("Global")[0];

        this.updateCache();

        MessagingService.SubscribeAsync((Util.isTestingServer() ? "Testing" : "Production") + " - UpdatedMessages", (message) => {
            let messages = message.Data as MessageDatas;
            print("Received Updated Messages: ", messages);
            messages.forEach((serializedMsg, uuid) => {
                if(!this.cachedMessages.get(uuid)?.compareVersions(serializedMsg)){
                    if(serializedMsg.toDelete){
                        this.cachedMessages.get(uuid)?.destroy();
                        this.cachedMessages.delete(uuid);
                    }else{
                        let deserialized = Message.deserialize(serializedMsg);
                        this.cachedMessages.set(uuid, deserialized);
                    }
                }
            });
        });
    }


    private updateCache(){

        this.global.Open();

        if(!this.pendingMessages.isEmpty()){
            const serializedPendingMsgs = new Map<string, SerializedMessage>();
            this.pendingMessages.forEach((msg, key) => serializedPendingMsgs.set(key, msg.serialize()));

            let updateResult = this.global.Update(transform => {
                serializedPendingMsgs.forEach((msg, key) => {
                    let olderMessage = transform.get(key);
                    // our version is older, so do not update
                    if(olderMessage === undefined || olderMessage.version < msg.version){
                        if(msg.toDelete)
                            transform.delete(key);
                        else
                            transform.set(key, msg);
                    } else {
                        serializedPendingMsgs.delete(key);
                        this.pendingMessages.delete(key);
                        // let it get updated later by the read
                    }
                });
                return transform;
            });

            if(updateResult.success){
                // this.pendingMessages.forEach((message, key) => {
                //     if(message.shouldBeDeleted()){
                //         this.cachedMessages.delete(key)
                //         message.destroy();
                //     }else
                //         this.cachedMessages.set(key, message);
                // })
                MessagingService.PublishAsync((Util.isTestingServer() ? "Testing" : "Production") + " - UpdatedMessages", serializedPendingMsgs);
                this.pendingMessages.clear();
            }
        }

        let result = this.global.Read(); 
        if(result.success){
            let data = result.data;
            data.forEach((serializedMsg, uuid) => {
                if(!this.cachedMessages.get(uuid)?.compareVersions(serializedMsg)){
                    let deserialized = Message.deserialize(serializedMsg);
                    this.cachedMessages.get(uuid)?.destroy();
                    this.cachedMessages.set(uuid, deserialized);
                }
            });
        }

        this.global.Close();

        print("Updated Cache: ", this.cachedMessages);
    }

    public addMessage(message: Message): string {
        const uuid = HttpService.GenerateGUID(false);
        this.pendingMessages.set(uuid, message);
        this.cachedMessages.set(uuid, message);
        bushes.addBush(Bush.createNewBush());
        this.updateCache();
        return uuid;
    }

    public removeMessage(uuid: string){
        let msg = this.pendingMessages.get(uuid);
        if(msg !== undefined){
            msg.setForDeletion(true);
            msg.incrementVersion();
            this.updateCache();
        }
    }

    public updateMessage(uuid: string, content: string) {
        let msg = this.pendingMessages.get(uuid);
        if(msg !== undefined){
            msg.setContent(content);
            msg.incrementVersion();
            this.updateCache();
        }
    }
}

type MessageDatas = Map<string, SerializedMessage>;

type BushDatas = Map<string, SerializedBush>;

type SerializedBush = {
    position: string
}

type SerializedMessage = {
    creator: number,
    content: string,
    position: string,
    color: string,
    version: number,
    toDelete: boolean
}

const bushes = new Bushes();
const messages = new Messages();
const remote = Remotes.getMessageCreator();

remote.OnServerEvent.Connect((player, content, position) => {
    messages.addMessage(new Message(player.UserId, content as string, position as Vector2))
    print("Created new message with content: " + content);
})