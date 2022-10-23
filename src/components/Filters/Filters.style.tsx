import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";

import { size } from "../../consts/breakpoints";

export const StyledFilters = styled.div`
  display: flex;
  padding: 10px;
  margin: 20px 0;
  min-height: 90px;

  @media screen and (max-width: ${size.desktopS}) {
    display: block;
	}

  @media screen and (max-width: ${size.desktopS}) {
    margin: 0 0 20px;
	}
`;

export const StyledDropdownFilters = styled.div`
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  position: relative;
  flex-wrap: wrap;
 
  &:last-child {
    margin-right: 0px;
  }

  @media screen and (min-width: ${size.tablet}) and (max-width: ${size.desktopS}) {
    margin: 10px;
	}

  @media screen and (max-width: ${size.tablet}) {
    margin: 10px 0 0 0;
	}
`
export const StyledResetFilters = styled.p`
  padding: 10px 0;
  position: absolute;
  right: 10px;
  bottom: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;

  @media screen and (max-width: ${size.desktopS}) {
    margin-top: 15px;
    padding: 0;
    position: relative;
    right: 0;
    bottom: 0;
	}

  @media screen and (max-width: ${size.mobile}) {
    margin-top: 28px;
    align-self: center;
	}
`;

export const StyledResetFilterIcon = styled(TiDeleteOutline)`
  font-size: 22px;
  color: white;
  display: block;
`

