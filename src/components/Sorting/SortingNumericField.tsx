import { FC, memo } from "react";

import { StyledIconSortingNumberAscending, StyledIconSortingNumberDescending, StyledSortingNumericField } from "./SortingNumericField.style";

interface ISortingNumericFieldProps {
  label: string,
  active: boolean,
  sorting: string,
  onClick: any,
}

const SortingNumericField: FC<ISortingNumericFieldProps> = ({ label, active, onClick, sorting }) => {

  return (
      <StyledSortingNumericField onClick={onClick}>
        {`Sort by ${label}:`}
        {sorting === 'ASC'
          ? <StyledIconSortingNumberAscending active={active} />
          : <StyledIconSortingNumberDescending active={active} />
        }
      </StyledSortingNumericField>
  )
}

export default memo(SortingNumericField);