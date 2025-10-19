import { Document, DocumentStore } from "@rbxts/document-service";
import { DataStoreService, HttpService, Players } from "@rbxts/services";
import { Util } from "shared/module";

class Message {
    private creator: number;
    private content: string;
    private position: Vector2;

    public constructor(player: number, content: string, position: Vector2){
        this.creator = player;
        this.content = content;
        this.position = position;
    }

    public setContent(content: string){
        this.content = content;
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

        return new Message(
            data.creator,
            data.content,
            new Vector2(decodedPosition.x, decodedPosition.y)
        )
    }

    public serialize(): SerializedMessage {
        return {
            creator: this.creator,
            content: this.content,
            position: HttpService.JSONEncode(this.position)
        }
    }
}

class Messages {
    private messages: Map<string, Message>;
    private store: DocumentStore<MessageDatas>;
    private global: Document<MessageDatas>;

    public constructor(){
        this.messages = new Map();
        this.store = new DocumentStore<MessageDatas>({
                dataStore: DataStoreService.GetDataStore((Util.isTestingServer() ? "Testing" : "Production") + " - Posts"),
                check: (data) => true,
                default: {
                    messages: new Map()
                },
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
    }

    private updateCache(){
        this.global.OpenAndUpdate((data) => {
            const newData: MessageDatas = {messages: new Map()};
            this.messages.forEach((message, uuid) => {
                if(!data.messages.has(uuid))
                    newData.messages.set(uuid, message.serialize())
                else {
                    if(data.messages.get(uuid)?.content !== message.getContent())
                        newData.messages.set(uuid, message.serialize())
                    else{
                        newData.messages.set(uuid, data.messages.get(uuid) as SerializedMessage);
                    }
                }
            })
            return newData;
        });
        this.global.Close();
    }

    public addMessage(message: Message): string {
        const uuid = HttpService.GenerateGUID(false);
        this.messages.set(uuid, message);
        this.updateCache();
        return uuid;
    }

    public updateMessage(uuid: string, content: string) {
        this.messages.get(uuid)?.setContent(content);
        this.updateCache();
    }
}

type MessageDatas = {
    messages: Map<string, SerializedMessage>
}

type SerializedMessage = {
    creator: number,
    content: string,
    position: string,
}

const messages = new Messages();