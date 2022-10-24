import styled from "styled-components";

import { size } from "../../consts/breakpoints";

export const StyledCardDetail = styled.section`
	position: relative;
	background: ${({ theme }) => theme.colors.cardBackground};
	color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
	margin-top: 10px;
	margin-bottom: 10px;
`;

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
`;

export const StyledTitle = styled.h1`
  padding: 10px 0;
	font-size: 32px;

	@media screen and (max-width: ${size.tablet}) {
		font-size: 22px;
		margin-right: 10px;
  }
`;