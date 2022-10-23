import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilters {
  status: string,
  gender: string,
  specie: string,
}

interface ISortingObject {
  sort: string,
  name: string,
  active: boolean,
}

interface ISorting {
  id: ISortingObject,
  name: ISortingObject
}

export interface ICharactersState {
  search: string,
  filters: IFilters,
  sorting: ISorting,
  pagination: {
    currentPage: number
  }
}

export const initialState: ICharactersState = {
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
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setFilter: (state, { payload }: PayloadAction<{ value: string, key: string }>) => {
      const filterKey = payload.key as keyof IFilters;
      state.filters[filterKey] = payload.value;
    },
    resetFilters: (state, { payload }: PayloadAction<{ filters: string[] }>) => {
      payload.filters.forEach((key) => {
        state.filters[key as keyof IFilters] = '';
      })
    },
    setSorting: (state, { payload }: PayloadAction<{ key: string, sort: string }>) => {
      // set all active sorting to false
      Object.keys(state.sorting).forEach((key) => { state.sorting[key as keyof ISorting].active = false });

      const sortingrKey = payload.key as keyof ISorting;

      state.sorting[sortingrKey] = {
        ...state.sorting[sortingrKey],
        sort: payload.sort === 'ASC' ? 'ASC' : 'DESC',
        active: payload.key === state.sorting[sortingrKey].name,
      }
    },
    setCurrentPage: (state, { payload }: PayloadAction<{ currentPage: number }>) => {
      state.pagination = {
        currentPage: payload.currentPage,
      }
    }
  },
});

export const { setSearchQuery, setFilter, resetFilters, setSorting, setCurrentPage } = charactersSlice.actions;
export default charactersSlice.reducer;
