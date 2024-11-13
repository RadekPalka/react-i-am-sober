export type Links = {
	elements: {
		type: string;
		to?: string;
		label?: string;
	}[];
	styles: {
		navJustifyContent?: 'start' | 'end' | 'space-between' | 'space-around';
		buttonsWidth?: string;
		buttonsHeight?: string;
	};
};
