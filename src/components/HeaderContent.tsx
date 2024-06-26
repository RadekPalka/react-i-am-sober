import styled from 'styled-components';
import { StyledH1 } from './StyledH1';
const StyledHeaderContent = styled.div`
	margin: 0 auto;
	width: 60%;
`;

const StyledCongratulationsParagraph = styled.p`
	text-align: center;
	font-weight: 600;
`;
const StyledParagraph = styled.p`
	text-align: center;
`;

export const HeaderContent: React.FC = () => {
	return (
		<StyledHeaderContent>
			<StyledH1>
				I am sober - aplikacja pomagająca w wyjściu z uzależnienia. Monitoruj
				swoją trzeźwość, śledź postępy i utrzymuj zdrowy styl życia.
			</StyledH1>
			<StyledCongratulationsParagraph>
				Przede wszystkim gratulacje
			</StyledCongratulationsParagraph>
			<StyledParagraph>
				Właśnie zrobiłeś duży krok ku trzeźwości
			</StyledParagraph>
		</StyledHeaderContent>
	);
};
