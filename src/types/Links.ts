export type Links = {
	elements: {
		type: string;
		to?: string;
		label?: string;
	}[];
	styles: {
		navJustifyContent?: 'start' | 'end' | 'space-between' | 'space-around';
		width?: string;
		height?: string;
		linkDisplay?: string;
		linkColor?: string;
		borderRadius?: string;
		linkBackgroundColor: string;

	};
};
