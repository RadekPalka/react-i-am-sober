import styled from 'styled-components';

export const HamburgerButton = styled.button`
	display: none;
	font-size: 1.5rem;
	color: #000;
	position: absolute;
	top: 20px;
	right: 20px;
	border: none;
	z-index: 2;
	@media (max-width: 768px) {
		display: block;
	}
`;
