import { FC } from 'react';

import { StyleErrorContainer } from './ErrorMessage.styled';
import { TError } from './model';

export interface IErrorMessageProps {
  error?: TError,
}

const ErrorMessage: FC<IErrorMessageProps> = ({ error }) => (
  <StyleErrorContainer>
    <p>{error?.message}</p>
  </StyleErrorContainer>
);

export default ErrorMessage;
