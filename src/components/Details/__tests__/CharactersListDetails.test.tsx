import { fireEvent, render, screen } from '@testing-library/react';
import { charactersDetailList } from '../../../../mockeData';

import CharactersListDetails, { ICharactersListDetailsProps } from '../CharactersListDetails';

describe('CharactersListDetails', () => {
  let mockedProps: ICharactersListDetailsProps;

  const renderView = (props: ICharactersListDetailsProps = mockedProps) => render(<CharactersListDetails {...props} />);

  beforeEach(() => {
    mockedProps = {
      characters: charactersDetailList,
      handleSetSelectedRecordToFetch: jest.fn(),
      loadingImages: false
    }
  })

  it('should render properly the spinner loading icon when `loadingImages` is true', () => {
    mockedProps.loadingImages = true;
    renderView();
    expect(screen.getByTestId('spinner-icon')).toBeInTheDocument();
  });

  it('should render properly `-- Nobody --` when characters is an empty array', () => {
    mockedProps.characters = [];
    renderView();

    expect(screen.getByText('-- Nobody --')).toBeInTheDocument();
  });

  it('should render properly the images when characters is a filled array and loadingImages is false and `handleSetSelectedRecordToFetch` is fired after the click', () => {
    renderView();

    charactersDetailList.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    })

    expect(screen.getAllByRole('img').length).toBe(2);

    const liElements = screen.getAllByTestId('character-list-detail-image',  { exact: false });
    liElements.forEach((li) => {
      fireEvent.click(li);
    })
    expect(mockedProps.handleSetSelectedRecordToFetch).toBeCalledTimes(2);

  });
});

