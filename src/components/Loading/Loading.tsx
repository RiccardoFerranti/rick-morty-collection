import { FC } from 'react';

import { StyledLoadingText, StyleDotsAnimation, StyleLoadingContainer } from './Loading.style';

export interface ILoadingProps {
  title: string,
}

const Loading: FC<ILoadingProps> = ({ title }) => (
  <StyleLoadingContainer>
    <StyledLoadingText>{`Loading ${title}`}</StyledLoadingText>
    <StyleDotsAnimation />
  </StyleLoadingContainer>
);

export default Loading;
