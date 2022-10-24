import { FC, memo, MouseEvent } from "react";

import { 
  StyledIconSortingAscending,
  StyledIconSortingDescending,
  StyledSortingAlphabeticalField
} from "./SortingAlphabeticalField.style";

export interface ISortingAlphabeticalFieldProps {
  label: string,
  active: boolean,
  sorting: string,
  onClick: (e: MouseEvent<HTMLElement>) => void,
}

const SortingAlphabeticalField: FC<ISortingAlphabeticalFieldProps> = ({ label, active, onClick, sorting }) => (
  <StyledSortingAlphabeticalField
    onClick={onClick}
    aria-label={`sorting-alphabetical-field-${label.replaceAll(' ', '-').toLocaleLowerCase()}`}
  >
    {`Sort by ${label}:`}
    {sorting === 'ASC'
      ? <StyledIconSortingAscending $active={active} />
      : <StyledIconSortingDescending $active={active} />}
  </StyledSortingAlphabeticalField>
);

export default memo(SortingAlphabeticalField);
