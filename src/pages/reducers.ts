export const SET_FILTER = 'SET_FILTER';
export const RESET_FILTER = 'RESET_FILTER';
export const SET_SORTING = 'SET_SORTING';

interface IFilterInitialState {
  status: string,
  gender: string,
  specie: string
}

export const filterInitialState: IFilterInitialState = {
  status: '',
  gender: '',
  specie: ''
};

export function filterReducer(state: IFilterInitialState, action: any): IFilterInitialState {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        [action.key]: action.value
      };

    case "RESET_FILTER":
      return {
        ...state,
        status: '',
        gender: '',
        specie: ''
      };

    default:
      return state;
  }
}

export const sortingInitialState = {
  id: {
    sort: 'ASC',
    name: 'id',
    active: true,
  },
  name: {
    sort: 'ASC',
    name: 'name',
    active: false
  },
};

export function sortingReducer(state: any, action: any) {
  console.log(action)
  switch (action.type) {
    case "SET_SORTING": {
      const newState = JSON.parse(JSON.stringify(state));
      // console.log(state)
      // set all active sorting to false
      Object.keys(newState).forEach((key) => { newState[key].active = false });

      // console.log(newState)
      console.log(action.key);
      console.log(state[action.key].name);
      console.log(action.key === state[action.key].name);
      return {
        ...newState,
        [action.key]: {
          ...newState[action.key],
          sort: action.sort === 'ASC' ? 'ASC' : 'DESC',
          active: action.key === newState[action.key].name,
        }
      };
    }
    // case "RESET_FILTER":
    //   return {
    //     ...state,
    //     status: '',
    //     gender: '',
    //     specie: ''
    //   };

    default:
      return state;
  }
}