interface Workspace extends Model {
	Camera: Camera;
	Baseplate: Part;
	EmpowerWall: Part;
	SpawnLocation: SpawnLocation & {
		Decal: Decal;
	};
	["Park Information Bulletin Board"]: Model & {
		Union: UnionOperation;
	};
}
