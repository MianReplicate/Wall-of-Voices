interface StarterGui extends BasePlayerGui {
	Empower: ScreenGui & {
		Frame: Frame & {
			Exit: TextButton;
			Text: TextBox;
			Create: TextButton & {
				UICorner: UICorner;
			};
		};
	};
}
