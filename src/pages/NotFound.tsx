import { FC } from 'react';

import BackButton from '../components/Buttons/BackButton';
import { StyledButtonWrapper, StyledNotFoundContainer, StyledNotFoundNumber, StyledNotFoundText } from './NotFound.style';

const NotFound: FC = () => (
  <StyledNotFoundContainer>
    <StyledButtonWrapper>
      <BackButton />
    </StyledButtonWrapper>
    <StyledNotFoundNumber>404</StyledNotFoundNumber>
    <StyledNotFoundText>Page Not Found</StyledNotFoundText>
  </StyledNotFoundContainer>
);

export default NotFound;
