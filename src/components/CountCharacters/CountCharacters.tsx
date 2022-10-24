import { FC } from 'react';

export interface ICountCharactersProps {
  totalCount?: number,
}

const CountCharacters: FC<ICountCharactersProps> = ({ totalCount }) => (
  <>Total Characters: <strong>{totalCount ? totalCount : 0}</strong></>
);

export default CountCharacters;
