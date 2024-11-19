import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavLink = styled(Link)`
	display: block;
	width: 90px;
	height: 30px;

	@media (max-width: 768px) {
		width: 100%;
		background-color: black;
		color: white;
		border-radius: 0;
		border-bottom: 1px solid white;

		&:hover {
			background-color: #333;
		}
	}
`;
