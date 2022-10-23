import { FC, memo, MouseEvent } from "react";

import {
  StyledIconSortingNumberAscending,
  StyledIconSortingNumberDescending,
  StyledSortingNumericField
} from "./SortingNumericField.style";

export interface ISortingNumericFieldProps {
  label: string,
  active: boolean,
  sorting: string,
  onClick: (e: MouseEvent<HTMLElement>) => void,
}

const SortingNumericField: FC<ISortingNumericFieldProps> = ({ label, active, onClick, sorting }) => (
  <StyledSortingNumericField
    onClick={onClick}
    aria-label={`sorting-numeric-field-${label.replaceAll(' ', '-').toLocaleLowerCase()}`}
  >
    {`Sort by ${label}:`}
    {sorting === 'ASC'
      ? <StyledIconSortingNumberAscending $active={active} />
      : <StyledIconSortingNumberDescending $active={active} />
    }
  </StyledSortingNumericField>
);

export default memo(SortingNumericField);