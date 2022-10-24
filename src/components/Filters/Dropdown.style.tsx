import styled from "styled-components";

import { size } from "../../consts/breakpoints";

export const StyledDropdown = styled.div`
  margin: 0 10px 0 0; 

  @media screen and (max-width: ${size.mobile}) {
    width: calc(50% - 5px);
    margin-top: 10px;

    &:nth-child(odd) {
      margin-right: 5px;
    }
    &:nth-child(even) {
      margin-left: 5px;
      margin-right: 0px;
    }
  }
`

export const StyledSelectLabel = styled.span`
  font-size: 13px;
  margin-right: 5px;

  @media screen and (max-width: ${size.desktopS}) {
    display: block;
    margin-bottom: 5px;
	}
`

export const StyledSelect = styled.select`
  width: 110px;
  height: 30px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.cardBackground};
  border: none;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid grey;

  @media screen and (max-width: ${size.mobile}) {
    width: 100%;
  }
`
