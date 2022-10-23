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
  const mockedLocation = { path: '/', state: 123 }
  
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
    renderView({ path: '/character/', state: 123 }, mockedStore);
    expect(screen.getByText("Loading character details")).toBeInTheDocument();
  });

  it('should render the Episode component properly', () => {
    renderView({ path: '/episode/', state: 123 }, mockedStore);
    expect(screen.getByText("Loading episode details")).toBeInTheDocument();
  });

  it('should render the Location component properly', () => {
    renderView({ path: '/location/', state: 123 }, mockedStore);
    expect(screen.getByText("Loading location details")).toBeInTheDocument();
  });
});