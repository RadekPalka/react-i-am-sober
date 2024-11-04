export type NavItem = {
	type: 'link' | 'button';
	text?: string;
	to?: string; // Only for links
	buttonComponent?: React.ReactNode; // For custom buttons like LogoutButton
	color?: string;
	background?: string;
	border?: string;
};
