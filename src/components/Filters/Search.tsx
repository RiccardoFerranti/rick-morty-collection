import { FC, KeyboardEvent, ChangeEvent, useState, useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { debounce } from 'lodash';

import { StyledClearSearchIcon, StyledSearchField, StyledTextInput } from "./Search.style";

import { useAppDispatch } from '../../redux/store';
import { setCurrentPage, setSearchQuery } from '../../redux/characters/characters.slice';
import { charactersSelector } from '../../redux/characters/characters.selector';

const SearchField: FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [keyDownPressed, setKeyDownPressed] = useState(false);

  const { search } = useSelector(charactersSelector, shallowEqual);
  
  const debounceSearchFn = useMemo(() => 
    debounce((value: string) => {
      dispatch(setSearchQuery(value));
      dispatch(setCurrentPage({ currentPage: 1 }));
    }, 300)
  , [dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);

    if (!keyDownPressed) {
      debounceSearchFn(event.target.value);
    } else {
      dispatch(setSearchQuery(event.target.value));
      dispatch(setCurrentPage({ currentPage: 1 }));
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Backspace') {
      setKeyDownPressed(true);
      return;
    }
    setKeyDownPressed(false);
  }

  const resetSearchField = () => {
    if (search.length) {
      setText('');
      dispatch(setSearchQuery(''));
      dispatch(setCurrentPage({ currentPage: 1 }));
    }
  };

  const searchValue = text.length ? text : search;

  return (
    <StyledSearchField>
      <StyledTextInput
        id='listing-search-input-text'
        aria-label='listing-search-input-text'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
        placeholder="Search for character..."
      />
      <StyledClearSearchIcon onClick={resetSearchField} />
    </StyledSearchField>
  )
}

export default SearchField;
