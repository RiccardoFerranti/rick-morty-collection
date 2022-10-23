import styled from 'styled-components';

import { size } from '../consts/breakpoints';

export const StyledLogo = styled.img`
	margin: 0 auto;
	display: block;

	@media screen and (min-width: ${size.desktopL}) {
		width: 800px;
	}

	@media screen and (min-width: ${size.desktopS}) and (max-width: ${size.desktopL}) {
		width: 800px;
	}

	@media screen and (min-width: ${size.tablet}) and (max-width: ${size.desktopS}) {
		width: 600px;
	}

	@media screen and (min-width: ${size.mobile}) and (max-width: ${size.tablet}) {
		width: 400px;
	}

	@media screen and (max-width: ${size.mobile}) {
		width: 100%;
    max-height: 180px;
	}
`;

export const StyledLayout = styled.section`
    margin: 0 auto;
		padding: 0px 15px 15px 15px;
    /* background: red; */

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
