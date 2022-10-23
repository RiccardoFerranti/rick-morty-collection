import { render, screen } from '@testing-library/react';
import { ApolloError } from '@apollo/client';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  const mockedProps: Partial<ApolloError> = {
    message: 'test error',
  };

  const renderView = (props: Partial<ApolloError> = mockedProps) => render(<ErrorMessage error={props} />);

  it('should render the `error` message properly', () => {
    renderView();
    expect(screen.getByText(`${mockedProps.message}`)).toBeInTheDocument();
  });
});

