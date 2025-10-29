import { Players, ReplicatedStorage, RunService, SoundService, StarterGui, UserInputService, Workspace } from "@rbxts/services";
import { Remotes } from "shared/module";

const player = Players.LocalPlayer;
const mouse = player.GetMouse();
const playerGui = Players.LocalPlayer.FindFirstChild("PlayerGui") as StarterGui;
const empower = playerGui.WaitForChild("Empower") as StarterGui["Empower"];

const textBox = empower.Frame.Text;
const create = empower.Frame.Create;
const exit = empower.Frame.Exit;

let posBeingUsed: Vector2 | undefined = undefined;

const onCreate = (pos: Vector2) => {
    if(empower.Enabled)
        return;

    posBeingUsed = pos;
    empower.Enabled = true;
};

exit.MouseButton1Click.Connect(() => {
    empower.Enabled = false
    note.Parent = ReplicatedStorage;
})

create.MouseButton1Click.Connect(() => {
    const text = textBox.Text;
    if(text !== undefined){
        textBox.Text = "";
        empower.Enabled = false;
        Remotes.getMessageCreator().FireServer(text, posBeingUsed);
        posBeingUsed = undefined;
        note.Parent = ReplicatedStorage;
    }
})

const note = ReplicatedStorage.StickyNote;
note.Color = Color3.fromRGB(28, 179, 28)
note.Material = Enum.Material.Neon;
note.Transparency = 0.5;
note.SurfaceGui.Frame.TextBox.Interactable = false;

const params = new RaycastParams();
params.FilterType = Enum.RaycastFilterType.Include;
params.AddToFilter(Workspace.WaitForChild("EmpowerWall"));

let toCreatePos: Vector3 | undefined = undefined;

let buttonDown = false;
RunService.Heartbeat.Connect(() => {

    if(!empower.Enabled){
        if(UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)){
            note.Parent = Workspace;
            buttonDown = true;
            const raycast = Workspace.Raycast(mouse.Origin.Position, mouse.Origin.LookVector.mul(20), params);
            const pos = raycast?.Position;
            if(pos !== undefined){
                note.Position = pos;
                toCreatePos = pos;
            } else {
                toCreatePos = undefined;
                note.Parent = ReplicatedStorage;
            }
        } else if(buttonDown){
            buttonDown = false;

            if(toCreatePos !== undefined){
                onCreate(new Vector2(toCreatePos.X, toCreatePos.Y))
                toCreatePos = undefined;
            }
        }
    }
})

UserInputService.InputBegan.Connect((inputObj, gpe) => {
    if(!gpe){
        if(inputObj.UserInputType === Enum.UserInputType.Touch){
            const raycast = Workspace.Raycast(inputObj.Position, (inputObj.Position.sub((Workspace.CurrentCamera as Camera).CFrame.Position)).mul(20), params);
            if(raycast?.Position !== undefined){
                onCreate(new Vector2(raycast.Position.X, raycast.Position.Y))
            }
        }
    }
})

Remotes.getPlaySound().OnClientEvent.Connect(() => {
    SoundService.success.Play();
});