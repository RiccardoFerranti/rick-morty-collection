import { FC } from 'react';
import { ApolloError } from '@apollo/client/errors';

import { StyleErrorContainer } from './ErrorMessage.styled';

export interface IErrorMessageProps {
  error?: ApolloError,
}

const ErrorMessage: FC<IErrorMessageProps> = ({ error }) => (
  <StyleErrorContainer>
    <p>{error?.message}</p>
  </StyleErrorContainer>
);

export default ErrorMessage;
