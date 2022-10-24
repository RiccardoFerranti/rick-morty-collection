import { screen, act } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';

import renderWithProvider, { generateMockedState } from '../../../testUtils';
import { filterKeys } from '../../consts/filters';
import { GET_COUNT_CHARACTERS, LOAD_ALL_CHARACTERS } from '../../GraphQL/Queries';
import { ICharactersState } from '../../redux/characters/characters.slice';
import Listing from '../Listing';

import { charactersDetails } from '../../../mockeData';

jest.mock<typeof import('../../helpers/cacheImages')>('../../helpers/cacheImages', () => ({
  __esModule: true,
  default: async () => {
    const promises = await Array.from({ length: 20 }, (_, idx) => idx + 1).map(() => {
      return new Promise<void>((resolve) => {
          return resolve();
      });
    })
    return await Promise.allSettled(promises);
  },
}));

describe('Listing', () => {
  let mockedStore: ICharactersState;
  const mockedLocation = { path: '/' }

  const mockQueryResultSuccess = [
    {
      request: {
        query: GET_COUNT_CHARACTERS,
      },
      result: {
        data: {
          characters: {
            info: {
              count: 1
            }
          }
        }
      },
    },
    {
      request: {
        query: LOAD_ALL_CHARACTERS,
        variables: {"id":[1]}
      },
      result: {
        data: {
          charactersByIds: [...charactersDetails]
        }
      }
    }
  ]

  const mockQueryResultError = [
    {
      request: {
        query: LOAD_ALL_CHARACTERS,
        variables: {"id":[1]}
      },
      error: new Error("An error occurred")
    }
  ]
  
  type TMockQueryResult = typeof mockQueryResultSuccess | typeof mockQueryResultError

  const renderView = (
    location = mockedLocation,
    store: ICharactersState = mockedStore,
    mockQueryResult: TMockQueryResult = mockQueryResultSuccess
  ) => renderWithProvider(
    <Listing />,
    { isRouter: true, location },
    {
      preloadedState: {
        characters: store,
      },
      mockQueryResult
    },
  );

  beforeEach(() => {
    mockedStore = generateMockedState();
  });

  it('should render the Error component properly', async () => {
    renderView(mockedLocation, mockedStore, mockQueryResultError);

    await act(wait);
    expect(await screen.findByText("An error occurred")).toBeInTheDocument();
  });
  
  it('should render the Loading component properly', async () => {
    renderView();

    expect(screen.getByText("Loading characters")).toBeInTheDocument();
    await act(wait);
    expect(screen.queryByText("Loading characters")).not.toBeInTheDocument();
  });
  
  it('should render the Search component properly', async () => {
    renderView();

    expect(screen.queryByLabelText("listing-search-input-text")).not.toBeInTheDocument()
    await act(wait);
    expect(screen.getByLabelText("listing-search-input-text")).toBeInTheDocument()
  });
  
  it('should filter properly using the search field', async () => {
    mockedStore.search = charactersDetails[0].name;
    renderView();

    expect(screen.queryByText(charactersDetails[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(charactersDetails[1].name)).not.toBeInTheDocument();

    await act(wait);

    expect(screen.getByText(`- ${charactersDetails[0].name}`)).toBeInTheDocument();
    expect(screen.queryByText(`- ${charactersDetails[1].name}`)).not.toBeInTheDocument();
  });

  it('should render the Filters components properly', async () => {
    renderView();

    expect(screen.queryByLabelText("listing-dropdown-filters")).not.toBeInTheDocument();
    expect(screen.queryByText("Reset fiters")).not.toBeInTheDocument();
    await act(wait);

    filterKeys.forEach(async (filterKey) => {
      expect(screen.getByLabelText(`listing-dropdown-${filterKey}`)).toBeInTheDocument();
    })

    expect(screen.getByText("Reset filters")).toBeInTheDocument();
  });
  
  it('should render the Sorting components properly', async () => {
    renderView();

    expect(screen.queryByText("Sort by ID:")).not.toBeInTheDocument();
    expect(screen.queryByText("Sort by Name:")).not.toBeInTheDocument();

    await act(wait);

    expect(screen.getByText("Sort by ID:")).toBeInTheDocument();
    expect(screen.getByText("Sort by Name:")).toBeInTheDocument();
  });

  it('should render the Count components properly', async () => {
    renderView();
    
    expect(screen.queryByText("Total Characters:")).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText("Total Characters:")).toBeInTheDocument();
  });

  it('should render the Characters properly', async () => {
    renderView();

    expect(screen.queryByTestId('listing-card-characters')).not.toBeInTheDocument();
    await act(wait);

    expect(screen.getByTestId('listing-card-characters')).toBeInTheDocument();

    charactersDetails.forEach(async (character) => {   
      const cardCharacter = screen.getByTestId(`card-character-${character.name.toLowerCase().replaceAll(' ', '-')}`);
      expect(cardCharacter).toBeInTheDocument();
      expect(cardCharacter).toHaveTextContent(`#${character.id}`);
      expect(cardCharacter).toHaveTextContent(character.name);
      expect(cardCharacter).toHaveTextContent(character.species);
      expect(cardCharacter).toHaveTextContent(character.status);
    })
  });
});
