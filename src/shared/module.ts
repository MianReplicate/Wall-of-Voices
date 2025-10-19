import { RunService } from "@rbxts/services";

export namespace Util {
	export function isTestingServer(){
		return RunService.IsStudio();
	}
}