import React from 'react';
import styled from 'styled-components';
import { AddictionCardProps } from '../types/AddictionCardProps';
import { StyledButton } from './StyledButton';
import { StyledLi } from './StyledLi';
import { StyledLink } from './StyledLink';

const CardWrapper = styled.li`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
	width: 300px;
	height: 200px;
	border: 1px solid black;
`;

export const AddictionCard: React.FC<AddictionCardProps> = ({
	name,
	costPerDay,
	id,
	removeAddiction,
}) => {
	return (
		<CardWrapper>
			<h2>{name}</h2>
			<p>Dzienny koszt: {costPerDay} PLN</p>
			<nav>
				<ul>
					<StyledLi $color='#2c2c2c' $backgroundColor='transparent'>
						<StyledLink
							to={`/addiction/${id}`}
							$display='block'
							$underline='none'
							$width='145px'
							$height='30px'
							$backgroundColor='#177373'
							$borderRadius='15px'
						>
							Pokaż szczegóły
						</StyledLink>
					</StyledLi>
					<StyledLi $backgroundColor='transparent' $color='white'>
						<StyledButton onClick={() => removeAddiction(id)}>
							Usuń
						</StyledButton>
					</StyledLi>
				</ul>
			</nav>
		</CardWrapper>
	);
};
