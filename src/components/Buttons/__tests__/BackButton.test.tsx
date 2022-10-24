import { fireEvent, screen } from '@testing-library/react';
import renderWithProvider from '../../../../testUtils';

import BackButton from '../BackButton';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


describe('BackButton', () => {  
  const renderView = () => renderWithProvider(<BackButton />);

  it('should render the component properly and call the navigate function', () => {
    const { container } = renderView();

    expect(screen.getByRole('button')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('BACK')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
  });
});
