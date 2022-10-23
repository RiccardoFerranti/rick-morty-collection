import styled from "styled-components";
import { AiOutlineSortAscending, AiOutlineSortDescending} from 'react-icons/ai';

import { IStyledIconSorting } from "./model";

export const StyledSortingAlphabeticalField = styled.div`
  font-size: 14px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledIconSortingAscending = styled(AiOutlineSortAscending)<IStyledIconSorting>`
  color: ${props => props.$active ? '#BCFE92' : 'white'};
  font-size: 24px;
`

export const StyledIconSortingDescending = styled(AiOutlineSortDescending)<IStyledIconSorting>`
  color: ${props => props.$active ? '#BCFE92' : 'white'};
  font-size: 24px;
`