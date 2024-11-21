import React from 'react';
import styled from 'styled-components';
import { AddictionCardProps } from '../types/AddictionCardProps';
import { StyledButton } from './StyledButton';
import { StyledUl } from './StyledUl';
import { StyledNav } from './StyledNav';
import { StyledLinkButton } from './StyledLinkButton';

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
			<StyledNav>
				<StyledUl $display='flex' $justifyContent='space-around'>
					<li>
						<StyledLinkButton to={`/addiction/${id}`}>
							Pokaż szczegóły
						</StyledLinkButton>
					</li>
					<li>
						<StyledButton onClick={() => removeAddiction(id)}>
							Usuń
						</StyledButton>
					</li>
				</StyledUl>
			</StyledNav>
		</CardWrapper>
	);
};
