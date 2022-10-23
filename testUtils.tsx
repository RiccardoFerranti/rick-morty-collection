import { FC, ReactNode, ReactElement, PropsWithChildren } from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing";
import Theme from './src/Theme';

import { rootReducer, TRootState } from './src/redux/characters.reducer';
import { ICharactersState } from './src/redux/characters/characters.slice';
import { TDictionary } from './src/commonTypes';

export const generateMockedState = (
  search = '',
  filters = {
    status: '',
    gender: '',
    specie: '',
  },
  sorting = {
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
  pagination = {
    currentPage: 1,
  }
): ICharactersState => ({
  search,
  filters,
  sorting,
  pagination,
})

interface IRouterLocation {
  path: string,
  state?: TDictionary
}

export const withRouter = (children: ReactNode | ReactNode[], location: IRouterLocation): JSX.Element => {
 const path = location.state ? `${location.path}${location.state}` : location.path

 return (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={children} />
        <Route path="/character/:id" element={children} />
        <Route path="/episode/:id" element={children} />
        <Route path="/location/:id" element={children} />
      </Routes>
    </MemoryRouter>
  )
}


export const setupStore = (preloadedState?: PreloadedState<TRootState>): any => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

interface IExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<Partial<TRootState>>,
  store?: ReturnType<typeof setupStore>,
  mockQueryResult?: any,
}

const renderWithProvider = (
  ui: ReactElement,
  {
    isRouter = false,
    location = { path: '/' },
  } = {},
  {
    preloadedState = {},
    mockQueryResult = [],
    store = setupStore(preloadedState),
    ...renderOptions
  }: IExtendedRenderOptions = {}
): any => {

  const Wrapper: FC<{ children: PropsWithChildren<any>}> = ({ children }) => (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <MockedProvider mocks={mockQueryResult} addTypename={false}>
          {isRouter ? withRouter(children as ReactNode[], location) : children}
        </MockedProvider>
      </ThemeProvider>
    </Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
};

export default renderWithProvider;

// const AllTheProviders: FC<{children: React.ReactNode}> = ({ children, isRouter }) => {
//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={Theme}>
//         {isRouter ? withRouter(children as ReactNode[], path) : children}
//       </ThemeProvider>
//     </Provider>
//   )
// }

// const customRender = (
//   ui: ReactElement,
//   options?: Omit<RenderOptions, 'wrapper'>,
// ) => render(ui, {wrapper: AllTheProviders, ...options})