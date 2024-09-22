import React from 'react';
import styled from 'styled-components';
import { AddictionCardProps } from '../types/AddictionCardProps';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from './StyledButton';
import { StyledNav } from './StyledNav';
import { StyledUl } from './StyledUl';
import { StyledLi } from './StyledLi';
import { StyledLink } from './StyledLink';

const CardWrapper = styled.li`
	display: flex;
	//justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 25%;
	border: 1px solid black;
`;
export const AddictionCard: React.FC<AddictionCardProps> = ({
	name,
	costPerDay,
	deadline,
	id,
	removeAddiction,
}) => {
	const navigate = useNavigate();

	return (
		<CardWrapper>
			<h2>{name}</h2>
			<p>Dzienny koszt: {costPerDay} PLN</p>
			{deadline && <p>{deadline}</p>}
			<StyledNav $justifyContent='end'>
				<StyledUl>
					<StyledLi $color='#2c2c2c' $background='transparent'>
						<StyledLink to={`/addiction/:${id}`}>Pokaż szczegóły</StyledLink>
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
			</StyledNav>
		</CardWrapper>
	);
};
