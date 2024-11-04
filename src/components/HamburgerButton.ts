import styled from 'styled-components';

export const HamburgerButton = styled.button`
	display: none;
	font-size: 1.5rem;
	color: #000;
	position: fixed;
	top: 20px;
	right: 20px;
	border: none;
	@media (max-width: 768px) {
		display: block;
	}
`;
