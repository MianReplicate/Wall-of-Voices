import { ReplicatedStorage, RunService } from "@rbxts/services";

const isTesting = false;

export namespace Util {
	export function isTestingServer(){
		return isTesting || RunService.IsStudio();
	}
}

export namespace Remotes {
	export function getMessageCreator() : RemoteEvent{
		return ReplicatedStorage.MessageCreator;
	}

	export function getPlaySound(): RemoteEvent {
		return ReplicatedStorage.PlaySound;
	}
}