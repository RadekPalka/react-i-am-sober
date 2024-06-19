import styled from 'styled-components';
const StyledHeader = styled.header`
	width: 50%;
	margin: 0 auto;
`;
const StyledCongratulationsParagraph = styled.p`
	text-align: center;
	font-weight: 600;
`;
const StyledParagraph = styled.p`
	text-align: center;
`;
export const Header: React.FC = () => {
	return (
		<StyledHeader>
			<h1>I am sober - aplikacja pomagająca w wyjściu z uzależnienia. Monitoruj swoją trzeźwość, śledź postępy i utrzymuj zdrowy styl życia.</h1>
			<StyledCongratulationsParagraph>
				Przede wszystkim gratulacje
			</StyledCongratulationsParagraph>
			<StyledParagraph>
				Właśnie zrobiłeś duży krok ku trzeźwości
			</StyledParagraph>
		</StyledHeader>
	);
};
