import React from 'react';
import styled from 'styled-components';
import { AddictionCardProps } from '../types/AddictionCardProps';
import { StyledButton } from './StyledButton';
import { StyledNav } from './StyledNav';
import { StyledUl } from './StyledUl';
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
				<StyledUl>
					<StyledLi $color='#2c2c2c' $background='transparent'>
						<StyledLink to={`/addiction/${id}`}>Pokaż szczegóły</StyledLink>
					</StyledLi>
					<StyledLi $background='transparent' $color='white' $border='none'>
						<StyledButton
							$padding='6px'
							$margin='10px 5px'
							onClick={() => removeAddiction(id)}
						>
							Usuń
						</StyledButton>
					</StyledLi>
				</StyledUl>
			</nav>
		</CardWrapper>
	);
};
