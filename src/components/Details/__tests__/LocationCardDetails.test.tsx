import { act, screen } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';

import LocationCardDetails, { ICardLocationDetailsProps } from '../LocationCardDetails';

import { LOAD_LOCATION_BY_ID } from '../../../GraphQL/Queries';
import { ICharactersState } from '../../../redux/characters/characters.slice';

import { locationsByIds } from '../../../../mockeData';
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

const mockQueryResultSuccess = (data: typeof locationsByIds) => [
  {
    request: {
      query: LOAD_LOCATION_BY_ID,
      variables: {"id": 1}
    },
    result: {
      data: {
        locationsByIds: [...data]
      }
    }
  }
]

const mockQueryResultError = [
  {
    request: {
      query: LOAD_LOCATION_BY_ID,
      variables: {"id": 1}
    },
    error: new Error("An error occurred")
  }
]

describe('LocationCardDetails', () => {
  let mockedProps: ICardLocationDetailsProps;
  let mockedStore: ICharactersState;
  const mockedLocation = { path: '/' }

  const renderView = (
    props: ICardLocationDetailsProps = mockedProps,
    location = mockedLocation,
    store: ICharactersState = mockedStore,
    mockQueryResult: any = mockQueryResultSuccess(locationsByIds)
  ) => renderWithProvider(
    <LocationCardDetails {...props} />,
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
    
    expect(screen.getByText("Loading location details")).toBeInTheDocument();
    await act(wait);
    expect(screen.queryByText("Loading location details")).not.toBeInTheDocument();
  });

  it('should render properly the location details `name`', async () => {
    renderView();
    
    expect(screen.queryByText(`${locationsByIds[0].name}`)).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText(`${locationsByIds[0].name}`)).toBeInTheDocument();
  });

  it('should render properly the location details `type` and dimension', async () => {
    renderView();

    await act(wait);
    const element = screen.getByTestId('details-location-description');
    expect(element).toHaveTextContent(`${locationsByIds[0].type}`);
    expect(element).toHaveTextContent(`${locationsByIds[0].dimension}`);
  });
  
  it('should render properly the location details when residents is an empty array', async () => {
    const data = JSON.parse(JSON.stringify(locationsByIds));
    data[0].residents = [];
    renderView(mockedProps ,mockedLocation, mockedStore, mockQueryResultSuccess(data));
    
    expect(screen.queryByText('-- Nobody --')).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText('-- Nobody --')).toBeInTheDocument();
  });
  
  it('should render properly the location details when residents is not an empty array', async () => {
    renderView();

    expect(screen.queryByText(`${locationsByIds[0].residents[0].name}`)).not.toBeInTheDocument();
    await act(wait);
    expect(screen.getByText(`${locationsByIds[0].residents[0].name}`)).toBeInTheDocument();
  });
});
