import { HeadingContainer } from '../components/HeadingContainer';
import { StyledH1 } from '../components/StyledH1';
import React from 'react';
export const Dashboard: React.FC = () => {
	return (
		<>
			<HeadingContainer>
				<StyledH1>
					Wygląda na to, że jeszcze nie dodałeś żadnego uzależnienia do
					monitorowania. Aby rozpocząć, kliknij poniższy link i wypełnij krótki
					formularz, który pomoże Ci śledzić swoje postępy.
				</StyledH1>
			</HeadingContainer>
		</>
	);
};
