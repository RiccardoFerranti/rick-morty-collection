import { FC, useState } from "react";

import { StyledIconSortingAscending, StyledIconSortingDescending, StyledSortingAlphabeticalField } from "./SortingAlphabeticalField.style";

interface ISortingAlphabeticalFieldProps {
  label: string,
  active: boolean,
  sorting: string,
  onClick: any,
}


const SortingAlphabeticalField: FC<ISortingAlphabeticalFieldProps> = ({ label, active, onClick, sorting }) => {
  console.log(active)
  return (
      <StyledSortingAlphabeticalField onClick={onClick}>
        {`Sort by ${label}:`}
        {sorting === 'ASC'
          ? <StyledIconSortingAscending active={active} />
          : <StyledIconSortingDescending active={active} />}
      </StyledSortingAlphabeticalField>
  )
}

export default SortingAlphabeticalField;