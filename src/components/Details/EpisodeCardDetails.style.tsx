import styled from "styled-components";

import { size } from "../../consts/breakpoints";

export const StyleCharacterEpisodeDetail= styled.div`
	padding: 20px;
	
	@media screen and (max-width: ${size.desktopS}) {
		display: block;
  }
`

export const StyledCharactersList = styled.ul`
	list-style-type: none;
	display: flex;
  flex-wrap: wrap;
	justify-content: center;

	li {
		cursor: pointer;
		background-color: #1C1C1C;
		box-shadow: 1px 1px 1px #000;
		border-radius: 6px;
		margin: 5px;
		padding: 5px;
		font-size: 14px;
		width: 120px;
		height: 150px;
		border: 3px solid #BCFE93;
	}

	li p {
		color: white;
		text-align: center;
		margin: 5px 0;
	}

	li:hover {
		background-color: #BCFE92;
	}

	li:hover p {
		color: #1C1C1C;
	}

	li:hover img {
		box-shadow: 0px 0px 3px #000;
	}
`;

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