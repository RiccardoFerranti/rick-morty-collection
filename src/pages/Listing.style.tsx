import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { size } from '../consts/breakpoints';

export const StyledLogo = styled.img`
	margin: 0 auto;
	width: 400px;
	display: block;
`;

export const StyledContainer = styled.section`
	margin: 0 auto;

	@media screen and (min-width: ${size.desktopL}) {
		width: 1280px;
	}

	@media screen and (min-width: ${size.desktopS}) and (max-width: ${size.desktopL}) {
		width: 980px;
	}

	@media screen and (min-width: ${size.tablet}) and (max-width: ${size.desktopS}) {
		width: 768px;
	}
`;

export const StyledCardContainer = styled.ul`
	list-style: none;
	display: flex;
  flex-wrap: wrap;
	padding: 10px;
	justify-content: center;
`

export const StyledLink = styled(Link)`
	text-decoration: none;

	@media screen and (min-width: ${size.desktopL}) { 
		width: calc(33.3333% - 20px);
		margin-left: 10px;
  	margin-right: 10px;
  }
	
	@media screen and (min-width: ${size.tablet}) and (max-width: ${size.desktopL}) {
		width: calc(50% - 20px);
		margin-left: 10px;
  	margin-right: 10px;
	}

	@media screen and (max-width: ${size.tablet}) {
		width: 100%;
  }
`;

export const StyledResults = styled.div`
	text-align: center;
	position: relative;
`

export const StyledRowImage = styled.img`
	width: 150px;
	border-radius: 150px;
	margin-left: auto;
	border: 5px solid black;
`

export const StyledSpinnerContainer =  styled.div`
	display: flex;
	justify-content: center;
	margin-top: 100px;
`