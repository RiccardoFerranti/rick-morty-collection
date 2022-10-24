import { act, screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import { charactersDetails } from '../../../../mockeData';
import renderWithProvider, { generateMockedState } from '../../../../testUtils';
import { LOAD_CHARACTER_BY_ID } from '../../../GraphQL/Queries';
import { ICharactersState } from '../../../redux/characters/characters.slice';

import CardCharacterDetails,{
  CardCharacterOriginDetails,
  ICardCharacterOriginDetailsProps,
} from '../CharacterCardDetails';

const mockQueryResultSuccess = [
  {
    request: {
      query: LOAD_CHARACTER_BY_ID,
      variables: {"id": 1}
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
      query: LOAD_CHARACTER_BY_ID,
      variables: {"id": 1}
    },
    error: new Error("An error occurred")
  }
]

type TMockQueryResult = typeof mockQueryResultSuccess | typeof mockQueryResultError

describe('CharacterCardDetails', () => {
  let mockedStore: ICharactersState;
  const mockedLocation = { path: '/rick-morty-collection/character/1' }

  const renderView = (
    location = mockedLocation,
    store: ICharactersState = mockedStore,
    mockQueryResult: TMockQueryResult = mockQueryResultSuccess
  ) => renderWithProvider(
    <CardCharacterDetails />,
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
    
    expect(screen.getByText("Loading character")).toBeInTheDocument();
    await act(wait);
    expect(screen.queryByText("Loading character")).not.toBeInTheDocument();
  });

  it('should render properly the character details title', async () => {
    renderView();
    
    expect(screen.queryByText(`#${charactersDetails[0].id} - ${charactersDetails[0].name}`)).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText(`#${charactersDetails[0].id} - ${charactersDetails[0].name}`)).toBeInTheDocument();
  });

  it('should render properly the card details `species` and `status`', async () => {
    renderView();

    expect(screen.queryByText(charactersDetails[0].species)).not.toBeInTheDocument();
    expect(screen.queryByText(charactersDetails[0].status)).not.toBeInTheDocument();
    
    await act(wait);

    expect(screen.getByText(charactersDetails[0].species)).toBeInTheDocument();
    expect(screen.getByText(charactersDetails[0].status)).toBeInTheDocument();
  });

  it('should render properly the character details `origin`', async () => {
    renderView();

    expect(screen.queryByText(charactersDetails[0].origin.dimension)).not.toBeInTheDocument();
    
    await act(wait);
    expect(screen.getByText(charactersDetails[0].origin.dimension)).toBeInTheDocument();
  });
 
  it('should render properly the character details `episode`', async () => {
    const charactersDetailsEpisode = charactersDetails[0].episode[0];
    renderView();

    expect(screen.queryByText(`${charactersDetailsEpisode.episode} - ${charactersDetailsEpisode.name}`)).not.toBeInTheDocument();
    
    await act(wait);
    expect(screen.getByText(`${charactersDetailsEpisode.episode} - ${charactersDetailsEpisode.name}`)).toBeInTheDocument();
  });
});

describe('CardCharacterOriginDetails', () => {
  let mockedProps: ICardCharacterOriginDetailsProps;

  const renderView = (props: ICardCharacterOriginDetailsProps = mockedProps) => renderWithProvider(
    <CardCharacterOriginDetails {...props} 
  />);

  beforeEach(() => {
    mockedProps = {
      character: {
        id: 1,
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        name: 'Rick Sanchez',
        species: 'Human',
        status: 'Alive',
        type: 'Human Type',
        origin: {
          id: null,
          dimension: null,
          name: "unknown",
          residents: [],
          type: null,
        },
        episode: [{
          id: '01',
          episode: 'S01E01',
          name: 'Pilot',
        }],
      },
      handleSetSelectedItemToFetch: jest.fn(),
    }
  })

  it('should render the origin properly when the origin `dimension` is null', () => {
    renderView();
    expect(screen.getByText(`The origin is ${mockedProps.character.origin?.name}`)).toBeInTheDocument();
  });
 
  it('should render the origin properly when the origin `dimension` is unknown and the origin `type` is not null', () => {
    mockedProps.character.origin.dimension = 'unknown';
    mockedProps.character.origin.name = 'Test name';
    mockedProps.character.origin.type = 'Planet';
    
    renderView();
    expect(screen.getByText(`The origin is ${mockedProps.character.origin.name}, it's a ${mockedProps.character.origin.type.toLowerCase()} situated in unknown dimension`)).toBeInTheDocument();
  });
  
  it('should render the origin properly when the origin `id`, `name`, `type` and `dimension` are not null', () => {
    mockedProps.character.origin.id = '01';
    mockedProps.character.origin.dimension = 'Test Dimension';
    mockedProps.character.origin.name = 'Test name';
    mockedProps.character.origin.type = 'Planet';

    renderView();
    expect(screen.getByText(`The origin is ${mockedProps.character.origin.name}, it's a ${mockedProps.character.origin.type.toLowerCase()} situated in the`)).toBeInTheDocument();
    expect(screen.getByText(`${mockedProps.character.origin.dimension}`)).toBeInTheDocument();
  });
});
