import { render, screen } from '@testing-library/react';

import ErrorMessage from '../ErrorMessage';
import { TError } from '../model';

describe('ErrorMessage', () => {
  const mockedProps: TError = {
    message: 'test error',
  };

  const renderView = (props: TError = mockedProps) => render(<ErrorMessage error={props} />);

  it('should render the `error` message properly', () => {
    renderView();
    expect(screen.getByText(`${mockedProps.message}`)).toBeInTheDocument();
  });
});
