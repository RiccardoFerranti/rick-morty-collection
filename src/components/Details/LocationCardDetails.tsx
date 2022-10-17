import { FC, memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { StyledText } from './CharacterCardDetails.style';

import { StyledCardDetail, StyledDetailTitle, StyledTitle } from './DetailsCommonStyle';
import { StyleCharacterEpisodeDetail, StyledCharactersList, StyledEpisodeDetailImage } from './EpisodeCardDetails.style';

import Loading from '../Loading/Loading';
import { LOAD_LOCATION_BY_ID } from '../../GraphQL/Queries';

interface ICardLocationDetailsProps {
  props: number
}

const CardLocationDetails: FC<ICardLocationDetailsProps> = ({ props }) => {
  const [location, setLocation] = useState<any>(undefined);
  const [selectedRecordToFetch, setSelectedRecordToFetch] = useState<{name: string | null, id: string | null}>({
    name: null,
    id: null
  });

  const navigate = useNavigate();

  const { error, loading, data } = useQuery(LOAD_LOCATION_BY_ID, {
    variables: { id: props },
  });

  const locationFetched = data?.locationsByIds?.[0];

  useEffect(() => {
    if (!error && locationFetched) {
      setLocation(locationFetched);
    }
  }, [locationFetched, error]);

  useEffect(() => {
    if (selectedRecordToFetch.name && selectedRecordToFetch.id) {
      navigate(`/character/${selectedRecordToFetch.name.toLowerCase().replaceAll(' ', '-')}`, { state: selectedRecordToFetch.id })
    }
  }, [selectedRecordToFetch.name, selectedRecordToFetch.id, navigate])

  return (
    <StyledCardDetail>
      {loading && <Loading title='location details' />}
      {error && <p>error</p>}
      {!error && location ? <>
        <StyledDetailTitle>
          <StyledTitle>{location.name}</StyledTitle>
        </StyledDetailTitle>
        <StyleCharacterEpisodeDetail>
          <StyledText>It's a {location.type} located in the {location.dimension}</StyledText>
          <StyledText>List of characters who have been last seen in the location:</StyledText>
          <StyledCharactersList>
            {!location.residents.length
              ? <StyledText> -- Nobody -- </StyledText>:
              location.residents.map(({ id, image, name }: { id: string, image: string, name: string }) => (
                <li key={`${name}-${id}`} onClick={() => setSelectedRecordToFetch({ name, id })}>
                  <StyledEpisodeDetailImage src={image} />
                  <p>{name}</p>
                </li>
            ))}
          </StyledCharactersList>
        </StyleCharacterEpisodeDetail>
      </>: null}
    </StyledCardDetail>
  );
};

export default memo(CardLocationDetails);