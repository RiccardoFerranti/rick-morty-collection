import { generateMockedState } from '../../../../testUtils';
import 
  charactersSliceReducer,
  { 
    ICharactersState, 
    setSearchQuery,
    setFilter,
    resetFilters,
    setSorting,
    setCurrentPage
  } from '../characters.slice';

describe('Characters state', () => {  
  let initialState: ICharactersState;

  beforeEach(() => {
    initialState = {
      search: '',
      filters: {
        status: '',
        gender: '',
        specie: '',
      },
      sorting: {
        id: {
          sort: 'ASC',
          name: 'id',
          active: true,
        },
        name: {
          sort: 'DESC',
          name: 'name',
          active: false
        },
      },
      pagination: {
        currentPage: 1,
      }
    }
  });

  it('should handle initial state', () => {
    const action = { type: 'unknown' }
    const expectedState = initialState

    expect(charactersSliceReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle setSearchQuery', () => {
    const state: ICharactersState = generateMockedState();
    const action = setSearchQuery('rick');
    const expectedState: ICharactersState = { ...state, search: 'rick' }

    expect(charactersSliceReducer(state, action)).toEqual(expectedState)
  })

  it('should handle setFilter', () => {
    const state: ICharactersState = generateMockedState();
    const action = setFilter({ value: 'alive', key: 'status' });
    const expectedState: ICharactersState = { 
      ...state,
      filters: {
        ...state.filters,
        status: 'alive'
      }
    }

    expect(charactersSliceReducer(state, action)).toEqual(expectedState)
  });

  it('should handle resetFilters', () => {
    const state: ICharactersState = generateMockedState();
    state.filters.status = 'alive'
    const action = resetFilters({ filters: ['status', 'gender', 'specie'] });
    const expectedState: ICharactersState = { 
      ...state,
      filters: {
        ...state.filters,
        status: ''
      }
    }

    expect(charactersSliceReducer(state, action)).toEqual(expectedState)
  });
  
  it('should handle setSorting', () => {
    const state: ICharactersState = generateMockedState();
    const action = setSorting({ key: 'id', sort: 'DESC' });
    const expectedState: ICharactersState = { 
      ...state,
      sorting: {
        ...state.sorting,
        id: {
          ...state.sorting.id,
          sort: 'DESC'
        }
      }
    }

    expect(charactersSliceReducer(state, action)).toEqual(expectedState)
  });

  it('should handle setCurrentPage', () => {
    const state: ICharactersState = generateMockedState();
    const action = setCurrentPage({ currentPage: 2 });
    const expectedState: ICharactersState = { 
      ...state,
      pagination: { currentPage: 2 }
    }

    expect(charactersSliceReducer(state, action)).toEqual(expectedState)
  });
});
