import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavLink = styled(Link)`
	display: block;
	width: 150px;
	height: 30px;
	background-color: black;
	color: white;
	text-decoration: none;
	border-radius: 15px;
	text-align: center;
	align-content: center;

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
