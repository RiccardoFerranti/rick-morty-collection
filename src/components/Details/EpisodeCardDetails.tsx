import { FC, memo, useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { StyledText } from './CharacterCardDetails.style';
import { StyledDetailTitle, StyledCardDetail, StyledTitle } from './DetailsCommonStyle';
import { StyleCharacterEpisodeDetail, StyledTextDate } from './EpisodeCardDetails.style';
import CharactersListDetails from './CharactersListDetails';

import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { LOAD_EPISODE_BY_ID } from '../../GraphQL/Queries';
import cacheImages from '../../helpers/cacheImages';
import { IEpisodeGraphQL, IResident } from '../../models';

type TEpisode = IEpisodeGraphQL & {
  air_date: string,
  characters: IResident[]
}
export interface IEpisodeCardDetailsProps {
  id: number
}

const EpisodeCardDetails: FC<IEpisodeCardDetailsProps> = ({ id }) => {
  const [episode, setEpisode] = useState<TEpisode | undefined>(undefined);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selectedRecordToFetch, setSelectedRecordToFetch] = useState<{name: string | null, id: string | null}>({
    name: null,
    id: null
  });

  const navigate = useNavigate();
  
  const { error, loading, data } = useQuery(LOAD_EPISODE_BY_ID, {
    variables: { id },
  });

  const episodeFetched = data?.episodesByIds?.[0] || {};

  useDeepCompareEffect(() => {
    if (!error && Object.values(episodeFetched).length) {
      setEpisode(episodeFetched);

      const preloadImages = async () => {
        setLoadingImages(true);
        await cacheImages(episodeFetched?.characters);
        setLoadingImages(false);
      }
      preloadImages();
    }
  }, [episodeFetched, error]);


  useEffect(() => {
    if (selectedRecordToFetch.name && selectedRecordToFetch.id) {
      navigate(`/rick-morty-collection/character/${selectedRecordToFetch.name.toLowerCase().replaceAll(' ', '-')}`, { state: selectedRecordToFetch.id })
    }
  }, [selectedRecordToFetch.name, selectedRecordToFetch.id, navigate])

  if (loading) {
    return <Loading title='episode' />
  }
  
  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <StyledCardDetail>
      {episode ? <>
        <StyledDetailTitle>
          <StyledTitle>{episode.episode} - {episode.name}</StyledTitle>
          <StyledTextDate>{episode.air_date}</StyledTextDate>
        </StyledDetailTitle>
        <StyleCharacterEpisodeDetail>
          <StyledText>List of characters who have been seen in the episode:</StyledText>
          <CharactersListDetails 
            characters={episode?.characters}
            handleSetSelectedRecordToFetch={setSelectedRecordToFetch}
            loadingImages={loadingImages}
          />
        </StyleCharacterEpisodeDetail>
      </> : null}
    </StyledCardDetail>
  );
};

export default memo(EpisodeCardDetails);
