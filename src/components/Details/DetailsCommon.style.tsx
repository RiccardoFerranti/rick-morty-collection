import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { size } from "../../consts/breakpoints";

export const StyledDetailCardCharacterImage = styled(LazyLoadImage)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
	display: block;
	margin: 5px auto 0;
`

export const StyledCardDetail = styled.section`
	position: relative;
	background: ${({ theme }) => theme.colors.cardBackground};
	color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
	margin-top: 10px;
	margin-bottom: 10px;
`

export const StyledDetailTitle = styled.div`
  font-size: 32px;
  text-shadow: 0px 4px 0px rgb(0 0 0);
  font-weight: 700;
	width: 100%;
	background: ${({ theme }) => theme.colors.cardBackgroundTitle};
	color: ${({ theme }) => theme.colors.text};
	padding: 10px;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	display: flex;

  @media screen and (max-width: ${size.tablet}) {
    display: block;
  }
`

export const StyledTitle = styled.h1`
	font-size: 32px;

	@media screen and (max-width: ${size.tablet}) {
		font-size: 22px;
		margin-right: 10px;
  }
`