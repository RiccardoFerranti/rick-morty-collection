import styled from "styled-components";

import { size } from "../../consts/breakpoints";

export const StyleCharacterEpisodeDetail = styled.div`
	padding: 20px;
	
	@media screen and (max-width: ${size.desktopS}) {
		display: block;
  }
`

export const StyledTextDate = styled.div`
	width: 150px;
	font-size: 16px;
	text-shadow: none;
	text-align: right;
  margin-left: auto;
	align-self: center;
	
	@media screen and (max-width: ${size.tablet}) {
		width: 100%;
		text-align: left;
  }
`
