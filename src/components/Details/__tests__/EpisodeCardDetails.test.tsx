import { act, screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';

import EpisodeCardDetails, { IEpisodeCardDetailsProps } from '../EpisodeCardDetails';

import { LOAD_EPISODE_BY_ID } from '../../../GraphQL/Queries';
import { ICharactersState } from '../../../redux/characters/characters.slice';

import { episodeDetails } from '../../../../mockeData';
import renderWithProvider, { generateMockedState } from '../../../../testUtils';

jest.mock<typeof import('../../../helpers/cacheImages')>('../../../helpers/cacheImages', () => ({
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

const mockQueryResultSuccess = [
  {
    request: {
      query: LOAD_EPISODE_BY_ID,
      variables: {"id": 1}
    },
    result: {
      data: {
        episodesByIds: [...episodeDetails]
      }
    }
  }
]

const mockQueryResultError = [
  {
    request: {
      query: LOAD_EPISODE_BY_ID,
      variables: {"id": 1}
    },
    error: new Error("An error occurred")
  }
]

type TMockQueryResult = typeof mockQueryResultSuccess | typeof mockQueryResultError

describe('EpisodeCardDetails', () => {
  let mockedProps: IEpisodeCardDetailsProps;
  let mockedStore: ICharactersState;
  const mockedLocation = { path: '/' }

  const renderView = (
    props: IEpisodeCardDetailsProps = mockedProps,
    location = mockedLocation,
    store: ICharactersState = mockedStore,
    mockQueryResult: TMockQueryResult = mockQueryResultSuccess
  ) => renderWithProvider(
    <EpisodeCardDetails {...props} />,
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
    mockedProps = { id: 1 };
  });

  it('should render the Error component properly', async () => {
    renderView(mockedProps, mockedLocation, mockedStore, mockQueryResultError);

    await act(wait);
    expect(await screen.findByText("An error occurred")).toBeInTheDocument();
  });
  
  it('should render the Loading component properly', async () => {
    renderView();
    
    expect(screen.getByText("Loading episode details")).toBeInTheDocument();
    await act(wait);
    expect(screen.queryByText("Loading episode details")).not.toBeInTheDocument();
  });

  it('should render properly the episode details `title`', async () => {
    renderView();
    
    expect(screen.queryByText(`${episodeDetails[0].episode} - ${episodeDetails[0].name}`)).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText(`${episodeDetails[0].episode} - ${episodeDetails[0].name}`)).toBeInTheDocument();
  });
  
  it('should render properly the episode details `air_date`', async () => {
    renderView();
    
    expect(screen.queryByText(`${episodeDetails[0].air_date}`)).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText(`${episodeDetails[0].air_date}`)).toBeInTheDocument();
  });
 
  it('should render properly the episode `characters`', async () => {
    renderView();

    expect(screen.queryByText(`${episodeDetails[0].characters[0].name}`)).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText(`${episodeDetails[0].characters[0].name}`)).toBeInTheDocument();
  });
});
