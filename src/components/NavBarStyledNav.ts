import styled from 'styled-components';
import { Link } from 'react-router-dom';
type Props = {
	$justifyContent?: 'start' | 'end' | 'space-between' | 'space-around';
};
export const NavBarStyledNav = styled.nav<Props>`
	top: 50px;
	justify-content: ${(props) => props.$justifyContent || 'space-around'};
	right: 0;

	@media (min-width: 769px) {
		display: flex;
		position: static;
		background-color: transparent;
		width: 100%;
		
	}
	 @media (max-width: 768px) {
	width: 100%;
     background-color: black
     color: white;
     border-radius: 0;
     border-bottom: 1px soli
	

     &:hover{
         background-color: #
     }
}
a{
	@media (max-width: 768px) {
		width: 100%;
        background-color: black;
        color: white;
        border-radius: 0;
        border-bottom: 1px solid white;
		

        &:hover{
            background-color: #333;
        }
	}

}
`;
