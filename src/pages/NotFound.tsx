import { FC } from 'react';

import BackButton from '../components/Buttons/BackButton';
import Layout from '../Layout/Layout';
import { StyledButtonWrapper, StyledNotFoundContainer, StyledNotFoundNumber, StyledNotFoundText } from './NotFound.style';

const NotFound: FC = () => (
  <Layout>
    <StyledNotFoundContainer>
      <StyledButtonWrapper>
        <BackButton />
      </StyledButtonWrapper>
      <StyledNotFoundNumber>404</StyledNotFoundNumber>
      <StyledNotFoundText>Page Not Found</StyledNotFoundText>
    </StyledNotFoundContainer>
  </Layout>
);

export default NotFound;
