import { FC, useEffect, useReducer, useState } from 'react';

import useDeepCompareEffect from 'use-deep-compare-effect';
import { useQuery } from "@apollo/client";
import { shallowEqual, useSelector } from 'react-redux';

import {  StyledCardContainer, StyledLink, StyledResults } from "./Listing.style";
import { 
  charactersInitialState,
  charactersReducer,
  SET_ALL_CHARACTERS,
  SET_CHARACTERS_TO_RENDER
} from './reducers';

import Pagination from '../components/Pagination/Pagination';
import CardCharacter from '../components/Character/CardCharacter';
import Loading from '../components/Loading/Loading';
import { StyledFilters } from '../components/Filters/Filters.style';
import Filters from '../components/Filters/Filters';
import Sorting from '../components/Sorting/Sorting';
import Search from '../components/Filters/Search';
import CountCharacters from '../components/CountCharacters/CountCharacters';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { charactersSelector } from '../redux/characters/characters.selector';
import { IFilters } from '../redux/characters/characters.slice';
import { LOAD_ALL_CHARACTERS, GET_COUNT_CHARACTERS } from "../GraphQL/Queries";
import { PAGE_INTERVAL } from '../consts/pagination';
import { filterKeys } from '../consts/filters';
import { ICharacter } from '../models';
import cacheImages from '../helpers/cacheImages';
import { searchArrayByKeyValue } from '../helpers/searching';
import { filterArrayByKeyValue } from '../helpers/filtering';
import { sortArrayAlphabeticallyByKeyValue, sortArrayNumericallyByKeyValue } from '../helpers/sorting';

const Listing: FC = () => {
  const [loadingImages, setLoadingImages] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);

  // store all the data fetched
  const [state, dispatch] = useReducer(charactersReducer, charactersInitialState);

  const { search, filters, sorting, pagination } = useSelector(charactersSelector, shallowEqual);

  // get the total number of characters
  const { data: countRecords } = useQuery(GET_COUNT_CHARACTERS);

  // get the all the characters
  const { error, loading, data } = useQuery(LOAD_ALL_CHARACTERS, {
    variables: { id: new Array(countRecords?.characters?.info?.count).fill(0).map((_,i) => i + 1)},
  });

  useEffect(() => {
    if (data) {
      dispatch({
        type: SET_ALL_CHARACTERS,
        payload: { characters: data.charactersByIds },
      })
    }
  }, [data, pagination.currentPage]);
  
  useEffect(() => {
    if (loading) setInitialLoad(true);
  }, [loading])

  useDeepCompareEffect(() => {
    const render = async (allCharacters: Array<ICharacter>, page: number, filters?: IFilters) => {
      let newAllCharacters = JSON.parse(JSON.stringify(allCharacters));

      if (!newAllCharacters.length) return;

      // case 1: search by name 
      if (search.length) {
        newAllCharacters = searchArrayByKeyValue(newAllCharacters, 'name', search);
      }

      // case 2: filter by status, gender and specie 
      filterKeys.forEach((key) => {
        const newKey = key === 'specie' ? 'species' : key; 
        const filterKey = key as keyof IFilters;

        if (filters?.[filterKey]) {
          newAllCharacters = filterArrayByKeyValue(newAllCharacters, newKey, filters[filterKey]);
        }
      })

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

      // Paginate the characters based on the current page
      const from = page === 1 ? 0 : (page * PAGE_INTERVAL) - PAGE_INTERVAL;
      const to = PAGE_INTERVAL * page;
      const paginatedCharacters = newAllCharacters.slice(from, to);

      /**
       * Case where we are not in the first loading, we can show the loading of images in order
       * of preloading all the images and present them all togheter to te user
       */
      if (!initialLoad) setLoadingImages(true)

      // Caching of images for the current page
      const allImagesPromises = await cacheImages(paginatedCharacters);

      // Make sure that the all the promises are resolved
      if (initialLoad && allImagesPromises.length !== PAGE_INTERVAL) return;

      /**
       * If we are in the first render and the fetching of all the characters is done,
       * so stop the initial load checking, taking advantage from the GraphQL caching system
       * this is appening just once until the cache is not deleted
       */ 
      if (initialLoad && !loading) setInitialLoad(false);

      // Once the preloading is finished, we can stop loading message
      if (!initialLoad) setLoadingImages(false)

      dispatch({
        type: SET_CHARACTERS_TO_RENDER,
        payload: { characters: paginatedCharacters,  totalCount: newAllCharacters.length },
      })
    }

    render(state.allCharacters, pagination.currentPage, filters);
  }, [
    state.allCharacters,
    pagination.currentPage,
    filters,
    sorting,
    search,
    loading
  ]);
  
  if (error) {
    return <ErrorMessage error={error} />
  }

  if (initialLoad) {
    return <Loading title='characters' />
  }

  return (
    <>
      <StyledFilters>
        <Search />
        <Filters />
      </StyledFilters>
      <StyledResults>
        <Sorting />
        <CountCharacters totalCount={state.charactersToRender?.totalCount} />
      </StyledResults>
      {loadingImages 
        ? <Loading title='characters' /> :
        <section>
          <StyledCardContainer data-testid="listing-card-characters">
            {state.charactersToRender.characters.map((character: ICharacter) => (
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
            currentPage={pagination.currentPage}
            totalCount={state.charactersToRender.totalCount}
            pageSize={PAGE_INTERVAL}
          />               
        </section>
      }
    </> 
  )
}

export default Listing;
