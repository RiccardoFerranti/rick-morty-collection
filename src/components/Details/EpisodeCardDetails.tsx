import { useQuery } from '@apollo/client';
import { FC, memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { StyledText } from './CharacterCardDetails.style';
import { StyleCharacterEpisodeDetail, StyledCharactersList, StyledEpisodeDetailImage, StyledTextDate } from './EpisodeCardDetails.style';
import { StyledDetailTitle, StyledCardDetail, StyledTitle } from './DetailsCommonStyle';

import { LOAD_EPISODE_BY_ID } from '../../GraphQL/Queries';
import Loading from '../Loading/Loading';

interface ICardEpisodeDetailsProps {
  props: number
}

const CardEpisodeDetails: FC<ICardEpisodeDetailsProps> = ({ props }) => {
  console.log(props)

  const [episode, setEpisode] = useState<any>(undefined);
  const [selectedRecordToFetch, setSelectedRecordToFetch] = useState<{name: string | null, id: string | null}>({
    name: null,
    id: null
  });

  const navigate = useNavigate();

  const { error, loading, data } = useQuery(LOAD_EPISODE_BY_ID, {
    variables: { id: props },
  });

  const episodeFetched = data?.episodesByIds?.[0];

  useEffect(() => {
    if (!error && episodeFetched) {
      setEpisode(episodeFetched);
    }
  }, [episodeFetched, error]);

  useEffect(() => {
    if (selectedRecordToFetch.name && selectedRecordToFetch.id) {
      navigate(`/character/${selectedRecordToFetch.name.toLowerCase().replaceAll(' ', '-')}`, { state: selectedRecordToFetch.id })
    }
  }, [selectedRecordToFetch.name, selectedRecordToFetch.id, navigate])

  return (
    <StyledCardDetail>
      {loading && <Loading title='episode details' />}
      {error && <p>error</p>}
      {!error && episode ? <>
        <StyledDetailTitle>
          <StyledTitle>{episode.episode} - {episode.name}</StyledTitle>
          <StyledTextDate>{episode.air_date}</StyledTextDate>
        </StyledDetailTitle>
        <StyleCharacterEpisodeDetail>
          <StyledText>List of characters who have been seen in the episode:</StyledText>
          <StyledCharactersList>
            {episode?.characters.map(({ id, image, name }: { id: string, image: string, name: string }) => (
              <li  key={`${name}-${id}`} onClick={() => setSelectedRecordToFetch({ name, id })}>
                <StyledEpisodeDetailImage src={image} />
                <p>{name}</p>
              </li>
            ))}
          </StyledCharactersList>
        </StyleCharacterEpisodeDetail>
      </> : null}
    </StyledCardDetail>
  );
};

export default memo(CardEpisodeDetails);