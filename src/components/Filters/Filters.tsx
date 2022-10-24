import { FC, FormEvent } from "react";

import { shallowEqual, useSelector } from "react-redux";
import { capitalize } from "lodash";

import Dropdown from "./Dropdown";
import { StyledDropdownFilters, StyledResetFilterIcon, StyledResetFilters } from "./Filters.style";

import { filterKeys, genderOptions, specieOptions, statusOptions } from "../../consts/filters";
import { charactersSelector } from "../../redux/characters/characters.selector";
import { setFilter, resetFilters, setCurrentPage, IFilters } from "../../redux/characters/characters.slice";
import { useAppDispatch } from "../../redux/store";

const Filters: FC = () => {
  const dispatch = useAppDispatch();

  const { filters } = useSelector(charactersSelector, shallowEqual);
  
  const handleSetFilterValue = (e: FormEvent<HTMLSelectElement>, key: string) => {
    dispatch(setFilter({ value: e.currentTarget.value, key }));
    dispatch(setCurrentPage({ currentPage: 1 }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters({ filters: ['status', 'gender', 'specie'] }));
    dispatch(setCurrentPage({ currentPage: 1 }));
  };

  const getDropdownOptions = (filterKey: string): Array<{label: string, value: string}> => {
    let options: Array<{label: string, value: string}> = [];
    switch(filterKey) {
      case 'status':
        options = statusOptions;
        break;
      case 'gender':
        options = genderOptions;
        break;
      case 'specie':
        options = specieOptions;
        break;
    }
    return options;
  }

  return (
    <StyledDropdownFilters data-testid="listing-dropdown-filters">
      {filterKeys.map((filterKey) => (
        <Dropdown
          key={`dropdown-${filterKey}`}
          label={capitalize(filterKey)}
          options={getDropdownOptions(filterKey)}
          value={filters[filterKey as keyof IFilters]}
          onChange={(e: FormEvent<HTMLSelectElement>) => handleSetFilterValue(e, filterKey)}
        />
      ))}
      <StyledResetFilters onClick={handleResetFilters}>
        Reset filters
        <StyledResetFilterIcon />
      </StyledResetFilters>
    </StyledDropdownFilters> 
  );
};

export default Filters;
