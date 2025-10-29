interface ReplicatedStorage extends Instance {
	TS: Folder & {
		module: ModuleScript;
	};
	PlaySound: RemoteEvent;
	StickyNote: Part & {
		SurfaceGui: SurfaceGui & {
			Frame: Frame & {
				TextBox: TextBox;
			};
		};
	};
	bush: Model & {
		Leaf: MeshPart & {
			SurfaceAppearance: SurfaceAppearance;
		};
		Trunk: MeshPart & {
			SurfaceAppearance: SurfaceAppearance;
		};
	};
	MessageCreator: RemoteEvent;
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@rbxts"]: Folder & {
				["document-service"]: Folder & {
					out: ModuleScript & {
						DocumentStore: ModuleScript;
						Retry: ModuleScript;
						Types: ModuleScript;
						Signal: ModuleScript;
						SaveUtil: ModuleScript;
						DeepFreeze: ModuleScript;
						Document: ModuleScript;
					};
				};
				services: ModuleScript;
				react: ModuleScript & {
					tags: ModuleScript;
				};
				["react-roblox"]: ModuleScript;
				["compiler-types"]: Folder & {
					types: Folder;
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
			};
			["@rbxts-js"]: Folder & {
				Number: ModuleScript & {
					MAX_SAFE_INTEGER: ModuleScript;
					isSafeInteger: ModuleScript;
					toExponential: ModuleScript;
					isNaN: ModuleScript;
					isInteger: ModuleScript;
					isFinite: ModuleScript;
					MIN_SAFE_INTEGER: ModuleScript;
				};
				Console: ModuleScript & {
					makeConsoleImpl: ModuleScript;
				};
				InstanceOf: ModuleScript & {
					["instanceof"]: ModuleScript;
				};
				SafeFlags: ModuleScript;
				Scheduler: ModuleScript & {
					SchedulerPriorities: ModuleScript;
					TracingSubscriptions: ModuleScript;
					SchedulerMinHeap: ModuleScript;
					forks: Folder & {
						["SchedulerHostConfig.mock"]: ModuleScript;
						["SchedulerHostConfig.default"]: ModuleScript;
					};
					Tracing: ModuleScript;
					Scheduler: ModuleScript;
					unstable_mock: ModuleScript;
					SchedulerProfiling: ModuleScript;
					SchedulerHostConfig: ModuleScript;
					SchedulerFeatureFlags: ModuleScript;
				};
				LuauPolyfill: ModuleScript & {
					Promise: ModuleScript;
					["extends"]: ModuleScript;
					AssertionError: ModuleScript & {
						["AssertionError.global"]: ModuleScript;
					};
					Error: ModuleScript & {
						["Error.global"]: ModuleScript;
					};
					encodeURIComponent: ModuleScript;
				};
				Math: ModuleScript & {
					clz32: ModuleScript;
				};
				ES7Types: ModuleScript;
				ReactGlobals: ModuleScript & {
					["ReactGlobals.global"]: ModuleScript;
				};
				Promise: ModuleScript;
				ReactRoblox: ModuleScript & {
					client: Folder & {
						roblox: Folder & {
							RobloxComponentProps: ModuleScript;
							SingleEventManager: ModuleScript;
							getDefaultInstanceProperty: ModuleScript;
						};
						ReactRobloxHostConfig: ModuleScript;
						ReactRobloxRoot: ModuleScript;
						ReactRoblox: ModuleScript;
						ReactRobloxComponentTree: ModuleScript;
						["ReactRobloxHostTypes.roblox"]: ModuleScript;
						ReactRobloxComponent: ModuleScript;
					};
					["ReactReconciler.roblox"]: ModuleScript;
				};
				ReactReconciler: ModuleScript & {
					ReactRootTags: ModuleScript;
					["ReactFiberDevToolsHook.new"]: ModuleScript;
					["ReactFiberWorkLoop.new"]: ModuleScript;
					ReactTestSelectors: ModuleScript;
					["ReactFiberHotReloading.new"]: ModuleScript;
					ReactCapturedValue: ModuleScript;
					["ReactFiberUnwindWork.new"]: ModuleScript;
					["ReactFiberNewContext.new"]: ModuleScript;
					["ReactProfilerTimer.new"]: ModuleScript;
					ReactInternalTypes: ModuleScript;
					["ReactFiber.new"]: ModuleScript;
					["ReactFiberCommitWork.new"]: ModuleScript;
					ReactFiberTransition: ModuleScript;
					forks: Folder & {
						["ReactFiberHostConfig.test"]: ModuleScript;
					};
					SchedulingProfiler: ModuleScript;
					["ReactStrictModeWarnings.new"]: ModuleScript;
					ReactPortal: ModuleScript;
					["SchedulerWithReactIntegration.new"]: ModuleScript;
					RobloxReactProfiling: ModuleScript;
					ReactWorkTags: ModuleScript;
					ReactFiberHostConfig: ModuleScript;
					ReactTypeOfMode: ModuleScript;
					ReactFiberOffscreenComponent: ModuleScript;
					["ReactUpdateQueue.new"]: ModuleScript;
					ReactFiberLane: ModuleScript;
					["ReactFiberClassComponent.new"]: ModuleScript;
					ReactHookEffectTags: ModuleScript;
					ReactFiberWorkInProgress: ModuleScript;
					ReactFiberTreeReflection: ModuleScript;
					["ReactChildFiber.new"]: ModuleScript;
					MaxInts: ModuleScript;
					["ReactFiberLazyComponent.new"]: ModuleScript;
					ReactFiberErrorDialog: ModuleScript;
					["ReactFiberBeginWork.new"]: ModuleScript;
					ReactFiberFlags: ModuleScript;
					DebugTracing: ModuleScript;
					ReactFiberErrorLogger: ModuleScript;
					["ReactFiberHooks.new"]: ModuleScript;
					["ReactFiberSchedulerPriorities.roblox"]: ModuleScript;
					["ReactFiberHydrationContext.new"]: ModuleScript;
					ReactFiberReconciler: ModuleScript;
					["ReactFiberContext.new"]: ModuleScript;
					["ReactFiberSuspenseContext.new"]: ModuleScript;
					["ReactFiberStack.new"]: ModuleScript;
					["ReactFiberHostContext.new"]: ModuleScript;
					["ReactMutableSource.new"]: ModuleScript;
					ReactCurrentFiber: ModuleScript;
					ReactFiberComponentStack: ModuleScript;
					["ReactFiberSuspenseComponent.new"]: ModuleScript;
					["ReactFiberCompleteWork.new"]: ModuleScript;
					["ReactFiberReconciler.new"]: ModuleScript;
					["ReactFiberRoot.new"]: ModuleScript;
					["ReactFiberThrow.new"]: ModuleScript;
				};
				Timers: ModuleScript & {
					makeIntervalImpl: ModuleScript;
					makeTimerImpl: ModuleScript;
				};
				Symbol: ModuleScript & {
					["Registry.global"]: ModuleScript;
					Symbol: ModuleScript;
				};
				String: ModuleScript & {
					endsWith: ModuleScript;
					indexOf: ModuleScript;
					lastIndexOf: ModuleScript;
					trimStart: ModuleScript;
					trim: ModuleScript;
					findOr: ModuleScript;
					substr: ModuleScript;
					slice: ModuleScript;
					startsWith: ModuleScript;
					charCodeAt: ModuleScript;
					trimEnd: ModuleScript;
					includes: ModuleScript;
					split: ModuleScript;
				};
				React: ModuleScript & {
					["None.roblox"]: ModuleScript;
					ReactLazy: ModuleScript;
					ReactElementValidator: ModuleScript;
					["createSignal.roblox"]: ModuleScript;
					ReactElement: ModuleScript;
					ReactMutableSource: ModuleScript;
					ReactContext: ModuleScript;
					ReactBaseClasses: ModuleScript;
					ReactNoopUpdateQueue: ModuleScript;
					ReactMemo: ModuleScript;
					ReactCreateRef: ModuleScript;
					ReactForwardRef: ModuleScript;
					React: ModuleScript;
					["ReactBinding.roblox"]: ModuleScript;
					ReactHooks: ModuleScript;
					ReactChildren: ModuleScript;
				};
				Collections: ModuleScript & {
					Map: ModuleScript & {
						Map: ModuleScript;
						coerceToTable: ModuleScript;
						coerceToMap: ModuleScript;
					};
					Object: ModuleScript & {
						values: ModuleScript;
						assign: ModuleScript;
						is: ModuleScript;
						seal: ModuleScript;
						entries: ModuleScript;
						preventExtensions: ModuleScript;
						isFrozen: ModuleScript;
						keys: ModuleScript;
						freeze: ModuleScript;
						None: ModuleScript;
					};
					Set: ModuleScript;
					Array: ModuleScript & {
						flat: ModuleScript;
						indexOf: ModuleScript;
						every: ModuleScript;
						slice: ModuleScript;
						sort: ModuleScript;
						shift: ModuleScript;
						map: ModuleScript;
						isArray: ModuleScript;
						findIndex: ModuleScript;
						unshift: ModuleScript;
						splice: ModuleScript;
						filter: ModuleScript;
						find: ModuleScript;
						forEach: ModuleScript;
						reverse: ModuleScript;
						includes: ModuleScript;
						concat: ModuleScript;
						from: ModuleScript & {
							fromString: ModuleScript;
							fromArray: ModuleScript;
							fromSet: ModuleScript;
							fromMap: ModuleScript;
						};
						join: ModuleScript;
						flatMap: ModuleScript;
						reduce: ModuleScript;
						some: ModuleScript;
					};
					inspect: ModuleScript;
					WeakMap: ModuleScript;
				};
				Boolean: ModuleScript & {
					toJSBoolean: ModuleScript;
				};
				Shared: ModuleScript & {
					["UninitializedState.roblox"]: ModuleScript;
					console: ModuleScript;
					ReactComponentStackFrame: ModuleScript;
					invariant: ModuleScript;
					ReactTypes: ModuleScript;
					objectIs: ModuleScript;
					ReactInstanceMap: ModuleScript;
					["Type.roblox"]: ModuleScript;
					["ConsolePatchingDev.roblox"]: ModuleScript;
					["ErrorHandling.roblox"]: ModuleScript;
					ReactFeatureFlags: ModuleScript;
					ReactElementType: ModuleScript;
					shallowEqual: ModuleScript;
					isValidElementType: ModuleScript;
					invokeGuardedCallbackImpl: ModuleScript;
					getComponentName: ModuleScript;
					formatProdErrorMessage: ModuleScript;
					PropMarkers: Folder & {
						Change: ModuleScript;
						Event: ModuleScript;
						Tag: ModuleScript;
					};
					consoleWithStackDev: ModuleScript;
					ReactErrorUtils: ModuleScript;
					["enqueueTask.roblox"]: ModuleScript;
					checkPropTypes: ModuleScript;
					ReactSharedInternals: ModuleScript & {
						ReactDebugCurrentFrame: ModuleScript;
						ReactCurrentOwner: ModuleScript;
						ReactCurrentDispatcher: ModuleScript;
						IsSomeRendererActing: ModuleScript;
						ReactCurrentBatchConfig: ModuleScript;
					};
					ReactVersion: ModuleScript;
					ReactSymbols: ModuleScript;
					["flowtypes.roblox"]: ModuleScript;
					["Symbol.roblox"]: ModuleScript;
					ExecutionEnvironment: ModuleScript;
					ReactFiberHostConfig: ModuleScript & {
						WithNoTestSelectors: ModuleScript;
						WithNoHydration: ModuleScript;
						WithNoPersistence: ModuleScript;
					};
				};
			};
		};
	};
}
