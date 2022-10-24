import styled from "styled-components";
import { TiDeleteOutline } from 'react-icons/ti'

import { size } from "../../consts/breakpoints";

export const StyledSearchField = styled.div`
  position: relative;
  width: 250px;

  @media screen and (max-width: ${size.tablet}) {
    display: block;
	}

  @media screen and (max-width: ${size.mobile}) {
    width: 100%;
  }
`

export const StyledTextInput = styled.input`
  background: ${({ theme }) => theme.colors.cardBackground};
  width: 250px; 
  height: 40px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 30px 0 10px;
  margin: 0 0 0 10px;
  border: 1px solid grey;

  &:focus,
  &:active {
    outline: none;
    background: ${({ theme }) => theme.colors.cardBackground};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 50px #282831 inset !important;
    -webkit-text-fill-color: white;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
  }

  @media screen and (max-width: ${size.tablet}) {
    margin: 0;
	}

  @media screen and (max-width: ${size.mobile}) {
    width: 100%;
  }
`;

export const StyledClearSearchIcon = styled(TiDeleteOutline)`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
  position: absolute;
  display: block;
  top: 9px;
  right: -3px;
  cursor: pointer;

  @media screen and (max-width: ${size.tablet}) {
    right: 5px;
	}
`
