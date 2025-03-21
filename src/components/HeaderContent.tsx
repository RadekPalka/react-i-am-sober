import styled from 'styled-components';
import React from 'react';
const StyledHeaderContent = styled.div`
	margin: 0 auto;
	width: 60%;
`;

const LocaleStyledH1 = styled.h1`
	line-height: 50px;
	text-align: center;
`;

export const HeaderContent: React.FC = () => {
	return (
		<StyledHeaderContent>
			<LocaleStyledH1>
				I am sober - aplikacja pomagająca w wyjściu z uzależnienia. Monitoruj
				swoją trzeźwość, śledź postępy i utrzymuj zdrowy styl życia.
			</LocaleStyledH1>
		</StyledHeaderContent>
	);
};
