import React, { StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";

const playerGui = Players.LocalPlayer.FindFirstChildOfClass("PlayerGui") as PlayerGui

function createButton(){
    return React.createElement("TextButton", {
        Size: new UDim2(1,0,1,0),
        Text: "Press me!"
    }, [
        React.createElement("UICorner", {
            CornerRadius: new UDim(0, 30)
        })
    ])
}

function createFrame(){
    return React.createElement("Frame", {
        Size: new UDim2(0, 100, 0, 100),
    })
}

const screenUI = new Instance("ScreenGui");
screenUI.Parent = playerGui;
const root = createRoot(screenUI);
root.render(React.createElement(createFrame, {}, [createButton()]));