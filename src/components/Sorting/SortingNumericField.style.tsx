import styled from "styled-components";
import { BsSortNumericUp, BsSortNumericDown} from 'react-icons/bs';

import { IStyledIconSorting } from "./model";

export const StyledSortingNumericField = styled.div`
  font-size: 14px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledIconSortingNumberAscending = styled(BsSortNumericDown)<IStyledIconSorting>`
  color: ${props => props.$active ? '#BCFE92' : 'white'};
  font-size: 24px;
`

export const StyledIconSortingNumberDescending = styled(BsSortNumericUp)<IStyledIconSorting>`
  color: ${props => props.$active ? '#BCFE92' : 'white'};
  font-size: 24px;
`