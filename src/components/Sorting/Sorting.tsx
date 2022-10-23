import { MouseEvent, FC } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { StyledSorting } from "./Sorting.style";
import SortingAlphabeticalField from "./SortingAlphabeticalField";
import SortingNumericField from "./SortingNumericField";

import { charactersSelector } from "../../redux/characters/characters.selector";
import { setSorting } from "../../redux/characters/characters.slice";
import { useAppDispatch } from "../../redux/store";

const Sorting: FC = () => {
  const dispatch = useAppDispatch();
  
  const { sorting } = useSelector(charactersSelector, shallowEqual);

  const handleSetSortingValue = (e: MouseEvent<HTMLElement>, key: string, sort: string) => {
    dispatch(setSorting({ key, sort }));
  }

  return (
    <StyledSorting data-testid="listing-sorting">
      <SortingNumericField 
        label='ID'
        sorting={sorting['id'].sort}
        active={sorting['id'].active}
        onClick={(e: MouseEvent<HTMLElement>) => handleSetSortingValue(e, 'id', sorting['id'].sort === 'ASC' ? 'DESC' : 'ASC')}
      />
      <SortingAlphabeticalField
        label='Name'
        sorting={sorting['name'].sort}
        active={sorting['name'].active}
        onClick={(e: MouseEvent<HTMLElement>) => handleSetSortingValue(e, 'name', sorting['name'].sort === 'ASC' ? 'DESC' : 'ASC')}
      />
    </StyledSorting>
  )
}

export default Sorting;