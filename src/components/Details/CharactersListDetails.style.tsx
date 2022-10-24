import styled from "styled-components";

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
		text-align: center;
	}

	li p {
		color: ${({ theme }) => theme.colors.text};
		text-align: center;
		margin: 5px 0;
	}

	li:hover {
		background-color: ${({ theme }) => theme.colors.highlight};
	}

	li:hover p {
		color: #1C1C1C;
	}

	li:hover img {
		box-shadow: 0px 0px 3px #000;
	}
`;
