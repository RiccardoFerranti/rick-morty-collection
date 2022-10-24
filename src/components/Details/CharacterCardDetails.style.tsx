import styled from "styled-components";

import { StyleTextHighlight } from "../CommonStyle.style";
import { size } from "../../consts/breakpoints";

export const StyleCharacterCardContainer = styled.div`
	display: flex;
	padding: 20px;
	
	@media screen and (max-width: ${size.desktopS}) {
		display: block;
  }
`

export const StyledCharacterDetailImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 300px;
	margin-right: 20px;
  box-shadow: 5px 5px 1px black;
	display: block;

	@media screen and (min-width: ${size.tablet}) and (max-width: ${size.desktopS}) {
		margin: 0 auto;
	}

	@media screen and (max-width: ${size.tablet}) {
		width: 150px;
		height: 150px;
		border-radius: 150px;
		margin: 0 auto;
  }
`

export const StyleCardCharacterTextContainer = styled.div`
	padding: 0 10px 0 0;
`

export const StyleCardCharacterText = styled.div`
	padding: 5px 0;
	line-height: 22px;
	font-size: 16px;

	@media screen and (max-width: ${size.tablet}) {
		font-size: 14px;
	}
`

export const StyledText = styled.p`
  padding: 10px 0;
`;

export const StyledLocation = styled.span`
	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;

export const StyledEpisodesList = styled.ul`
	list-style-type: none;

	li {
		display: inline-block;
		cursor: pointer;
		background-color: #dee5da;
		box-shadow: 1px 1px 1px #000;
		border-radius: 6px;
		color: black;
		margin: 5px;
		padding: 5px;
		font-size: 14px;
	}

	li:hover {
		background-color: ${({ theme }) => theme.colors.highlight};
	}

	li p {
		display: inline-block;
	}
`;

export const StyleCardHighlightTextExtended = styled(StyleTextHighlight)`
    cursor: pointer;
`;
