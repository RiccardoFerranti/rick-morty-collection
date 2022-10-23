import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';

import { size } from '../../consts/breakpoints';

interface IStyledCharacterImage {
  realSize: boolean,
}

export const StyledCharacterImage = styled.img<IStyledCharacterImage>`
  width: ${({ realSize }) => realSize ? '300px' : '150px'};
  height: ${({ realSize }) => realSize ? '300px' : '150px'};
  border-radius: ${({ realSize }) => realSize ? '150px' : '75px'};
  margin-right: 20px;
  box-shadow: 5px 5px 1px black;
	z-index: 2;

  @media screen and (max-width: ${size.tablet}) {
		width: 150px;
		height: 150px;
		border-radius: 75px;
  }
`

export const StyledCard = styled.li`
	margin-top: 10px;
	margin-bottom: 10px;
  border-radius: 8px;
	background: #282831;
	color: white;
	min-height: 270px;
  height: auto;

	&:hover {
		box-shadow: 0px 0px 15px #BCFE92;
    transition: all 0.2s ease-in;
	}
`
export const StyleCardContainer = styled.div`
	display: flex;
	padding: 20px;
`

export const StyleCardTextContainer = styled.div`
	padding: 0 10px 0 0;
`

export const StyledCharacterTitle = styled.p`
	font-size: 22px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
	width: 100%;
	background: #1b1b1b;
	padding: 10px;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	color: white;
	display: flex;
  align-items: center;
`;

export const StyleCardText = styled.p`
	padding: 5px 0;
	line-height: 22px;
	font-size: 16px;
`

export const StyleCardSeparator = styled.span`
	padding: 5px 0;
	line-height: 22px;
	font-size: 16px;
`
