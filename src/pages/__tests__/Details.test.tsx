import { screen } from '@testing-library/react';

import Details from '../Details';

import renderWithProvider, { generateMockedState } from '../../../testUtils';
import { ICharactersState } from '../../redux/characters/characters.slice';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Details', () => {
  let mockedStore: ICharactersState;
  const mockedLocation = { path: '/rick-morty-collection' }
  
  const renderView = (location = mockedLocation, store: ICharactersState = mockedStore) => renderWithProvider(
    <Details />,
    { isRouter: true, location },
    {
      preloadedState: {
        characters: store,
      },
    },
  );

  beforeEach(() => {
    mockedStore = generateMockedState();
  });

  it('should render the Character component properly', () => {
    renderView({ path: `${mockedLocation.path}/character/1` }, mockedStore);
    expect(screen.getByText("Loading character")).toBeInTheDocument();
  });

  it('should render the Episode component properly', () => {
    renderView({ path: `${mockedLocation.path}/episode/1` }, mockedStore);
    expect(screen.getByText("Loading episode")).toBeInTheDocument();
  });

  it('should render the Location component properly', () => {
    renderView({ path: `${mockedLocation.path}/location/1` }, mockedStore);
    expect(screen.getByText("Loading location")).toBeInTheDocument();
  });
});
