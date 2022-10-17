import { ChangeEvent, FC, useEffect, useState, useReducer } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useQuery } from "@apollo/client";

import {  StyledCardContainer, StyledLink, StyledResults } from "./Listing.style";
import { SET_FILTER, filterInitialState, filterReducer, RESET_FILTER, sortingReducer, sortingInitialState, SET_SORTING } from './reducers';

import Layout from '../Layout/Layout';
import { LOAD_ALL_CHARACTERS, GET_COUNT_CHARACTERS } from "../GraphQL/Queries";
import { genderOptions, specieOptions, statusOptions } from '../const/filters';
import Pagination from '../components/Pagination/Pagination';
import CardCharacter from '../components/Character/CardCharacter';
import Loading from '../components/Loading/Loading';
import SearchField from '../components/Filters/Search';
import { StyledFilters } from '../components/Filters/Filters.style';
import Dropdown from '../components/Filters/Dropdown';
import Filters from '../components/Filters/Filters';
import Sorting from '../components/Sorting/Sorting';
import { PAGE_INTERVAL } from '../const/general';
import SortingNumericField from '../components/Sorting/SortingNumericField';
import SortingAlphabeticalField from '../components/Sorting/SortingAlphabeticalField';
import { filterArrayByKeyValue, searchArrayByKeyValue, sortArrayAlphabeticallyByKeyValue, sortArrayNumericallyByKeyValue } from '../utils';

const Listing: FC = () => {
  // store data fetched
  const [allCharacters, setAllCharacters] = useState({ characters: [], totalCount: 0 });
  const [characters, setCharacters] = useState({ characters: [], totalCount: 0 });

  // pages
  const [currentPage, setCurrentPage] = useState(1);

  // filters
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [filters, dispatchFilters] = useReducer(filterReducer, filterInitialState);

  // sorting
  const [sorting, dispatchSorting] = useReducer(sortingReducer, sortingInitialState);

  const handleSetFilterValue = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    dispatchFilters({ type: SET_FILTER, key, value: e.target.value });
  };

  const handleResetFilters = () => { dispatchFilters({ type: RESET_FILTER }) };

  const handleSetSortingValue = (e: ChangeEvent<HTMLInputElement>, key: string, sort: string) => {
    dispatchSorting({ type: SET_SORTING, key, sort });
  }

  console.log(sorting)
  // get the total number of characters
  const { data: countRecords } = useQuery(GET_COUNT_CHARACTERS);
  
  const { error, loading, data } = useQuery(LOAD_ALL_CHARACTERS, {
    variables: { id: new Array(countRecords?.characters?.info?.count).fill(0).map((_,i) => i + 1)},
  });

  useEffect(() => {
    if (data) {
      setAllCharacters({ characters: data.charactersByIds, totalCount: data.charactersByIds.length });
    }
  }, [ data, currentPage ]);

  useDeepCompareEffect(() => {
    const render = (allCharacters: any, page: number, filters?: any) => {
      let newAllCharacters = JSON.parse(JSON.stringify(allCharacters));

      if (!newAllCharacters.length) return;

      // case 1: search by name 
      if (searchInputValue.length) {
        newAllCharacters = searchArrayByKeyValue(newAllCharacters, 'name', searchInputValue);
      }

      // case 2: filter by status 
      if (filters.status) {
        newAllCharacters = filterArrayByKeyValue(newAllCharacters, 'status', filters.status);
      }
      
      // case 3: filter by gender 
      if (filters.gender) {
        newAllCharacters = filterArrayByKeyValue(newAllCharacters, 'gender', filters.gender);
      }

      // case 3: filter by species 
      if (filters.specie) {
        newAllCharacters = filterArrayByKeyValue(newAllCharacters, 'species', filters.specie);
      }
      
      // Sort by ID
      if (sorting['id'].name === 'id' && sorting['id'].active) {
        const sortingKey = sorting['id'].sort;
        newAllCharacters = sortArrayNumericallyByKeyValue(newAllCharacters, sortingKey, 'id')
      }

      // Sort by Name
      if (sorting['name'].name === 'name' && sorting['name'].active) {
        const sortingKey = sorting['name'].sort;
        newAllCharacters = sortArrayAlphabeticallyByKeyValue(newAllCharacters, sortingKey, 'name')
      }

      // it paginates the characters based on the current page
      const from = page === 1 ? 0 : (page * PAGE_INTERVAL) - PAGE_INTERVAL;
      const to = PAGE_INTERVAL * page;
      const paginatedCharacters = newAllCharacters.slice(from, to);

      setCharacters((prevState) => ({ 
        ...prevState,
        characters: paginatedCharacters,
        totalCount: newAllCharacters.length
      }))
    }

    render(allCharacters.characters, currentPage, filters);
  }, [
    allCharacters.characters,
    currentPage,
    searchInputValue,
    filters,
    sorting,
  ]);
  
  return (
    <Layout>
      {loading && <Loading title='characters' />}
      {error && <p>error</p>}
      {!loading && !error ? <>
        <StyledFilters>
          <SearchField handleSetSearchInputValue={setSearchInputValue} searchInputValue={searchInputValue} />
          <Filters onHandleResetFilters={handleResetFilters}>
            <Dropdown
              label="Status"
              options={statusOptions}
              value={filters.status}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetFilterValue(e, 'status')}
            />
            <Dropdown
              label="Gender"
              options={genderOptions}
              value={filters.gender}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetFilterValue(e, 'gender')}
            />
            <Dropdown
              label="Species"
              options={specieOptions}
              value={filters.specie}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetFilterValue(e, 'specie')}
            />
          </Filters>
        </StyledFilters>
        <StyledResults>
          <Sorting>
            <SortingNumericField 
              label='ID'
              sorting={sorting['id'].sort}
              active={sorting['id'].active}
              onClick={(e: ChangeEvent<HTMLInputElement>) => handleSetSortingValue(e, 'id', sorting['id'].sort === 'ASC' ? 'DESC' : 'ASC')}
            />
            <SortingAlphabeticalField
              label='Name'
              sorting={sorting['name'].sort}
              active={sorting['name'].active}
              onClick={(e: ChangeEvent<HTMLInputElement>) => handleSetSortingValue(e, 'name', sorting['name'].sort === 'ASC' ? 'DESC' : 'ASC')}
            />
          </Sorting>
          Total Characters: <b>{characters?.totalCount ? characters?.totalCount : 0}</b>
        </StyledResults>
          <StyledCardContainer>
            {characters.characters.map((character: any) => (
              <StyledLink 
                to={{ pathname: `/character/${character.name.toLowerCase().replaceAll(' ', '-')}` }}
                state={character.id}
                key={character.id}
              >
                <CardCharacter character={character} />
              </StyledLink>
            ))}
          </StyledCardContainer>
          <Pagination
            currentPage={currentPage}
            totalCount={characters.totalCount}
            pageSize={20}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </>: null}
    </Layout>
  )
}

export default Listing;