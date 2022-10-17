import { FC, ChangeEvent } from 'react';
import { StyledClearSearchIcon, StyledSearchField, StyledTextInput } from "./Search.style";

interface ISearchField {
  searchInputValue: string,
}

const SearchField: FC<any> = ({ handleSetSearchInputValue, searchInputValue }) => (
  <StyledSearchField>
    <StyledTextInput
      id='search-input-text'
      data-testid='search-input-text'
      onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetSearchInputValue(e.target.value)}
      value={searchInputValue}
      placeholder="Search for character..."
    />
    <StyledClearSearchIcon onClick={() => handleSetSearchInputValue('')} />
  </StyledSearchField>
);

export default SearchField;
