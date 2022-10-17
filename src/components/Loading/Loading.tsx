import { FC } from 'react';
import { StyleDotsAnimation, StyleLoadingContainer } from './Loading.style';

// it's used for animation
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface ILoadingProps {
  title: string,
}

const Loading: FC<ILoadingProps> = ({ title }) => (
  <StyleLoadingContainer>
    <p>{`Loading ${title}`}</p>
    <StyleDotsAnimation />
  </StyleLoadingContainer>
);

export default Loading;