import { FC, memo, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import useDeepCompareEffect from 'use-deep-compare-effect';

import CharactersListDetails from './CharactersListDetails';
import { StyledText } from './CharacterCardDetails.style';
import { StyledCardDetail, StyledDetailTitle, StyledTitle } from './DetailsCommonStyle';
import { StyleCharacterEpisodeDetail } from './EpisodeCardDetails.style';

import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { LOAD_LOCATION_BY_ID } from '../../GraphQL/Queries';
import cacheImages from '../../helpers/cacheImages';
import { IResident } from '../../models';

interface IDimension {
  id: string,
  name: string,
  type: string,
  dimension: string,
  residents: IResident[]
}

export interface ICardLocationDetailsProps {
  id: number
}

export const LocationCardDetails: FC<ICardLocationDetailsProps> = ({ id }) => {
  const [location, setLocation] = useState<IDimension | undefined>(undefined);
  const [loadingImages, setLoadingImages] = useState(false);
  const [selectedRecordToFetch, setSelectedRecordToFetch] = useState<{name: string | null, id: string | null}>({
    name: null,
    id: null
  });

  const navigate = useNavigate();

  const { error, loading, data } = useQuery(LOAD_LOCATION_BY_ID, {
    variables: { id },
  });

  const locationFetched = data?.locationsByIds?.[0] || {};

  useDeepCompareEffect(() => {
    if (!error && Object.values(locationFetched).length) {
      setLocation(locationFetched);

      const preloadImages = async () => {
        setLoadingImages(true);
        await cacheImages(locationFetched.residents);
        setLoadingImages(false);
      }
      preloadImages();
    }
  }, [locationFetched, error]);

  useEffect(() => {
    if (selectedRecordToFetch.name && selectedRecordToFetch.id) {
      navigate(`/rick-morty-collection/character/${selectedRecordToFetch.name.toLowerCase().replaceAll(' ', '-')}`, { state: selectedRecordToFetch.id })
    }
  }, [selectedRecordToFetch.name, selectedRecordToFetch.id, navigate])

  if (loading) {
    return <Loading title='location' />
  }
  
  if (error) {
    return <ErrorMessage error={error} />
  }
  
  return (
    <StyledCardDetail>
      {location ? <>
        <StyledDetailTitle>
          <StyledTitle>{location.name}</StyledTitle>
        </StyledDetailTitle>
        <StyleCharacterEpisodeDetail>
          <StyledText data-testid="details-location-description">It's a {location.type} located in the {location.dimension}</StyledText>
          <StyledText>List of characters who have been last seen in the location:</StyledText>
          <CharactersListDetails 
            characters={location?.residents}
            handleSetSelectedRecordToFetch={setSelectedRecordToFetch}
            loadingImages={loadingImages}
          />
        </StyleCharacterEpisodeDetail>
      </>: null}
    </StyledCardDetail>
  );
};

export default memo(LocationCardDetails);
