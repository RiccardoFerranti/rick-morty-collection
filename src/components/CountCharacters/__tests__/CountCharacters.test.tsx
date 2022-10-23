import { render, screen } from '@testing-library/react';
import CountCharacters, { ICountCharactersProps } from '../CountCharacters';

describe('CountCharacters', () => {
  const mockedProps: ICountCharactersProps = {
    totalCount: 10,
  };

  const renderView = (props: ICountCharactersProps = mockedProps) => render(<CountCharacters {...props} />);

  it('should render the `totalCount` properly', () => {
    renderView();
    expect(screen.getByText(`${mockedProps.totalCount}`).textContent).toBe(mockedProps.totalCount?.toString());
  });
});

