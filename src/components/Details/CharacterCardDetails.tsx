import { useQuery } from '@apollo/client';
import { FC, memo, useEffect, useState, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOAD_CHARACTER_BY_ID } from '../../GraphQL/Queries';

import { ICharacter } from '../../model';

import Loading from '../Loading/Loading';
import { 
  StyleCardCharacterText,
  StyleCardCharacterTextContainer,
  StyleCardHighlightTextExtended,
  StyleCharacterCardContainer,
  StyledCharacterDetailImage,
  StyledEpisodesList,
  StyledText,
} from './CharacterCardDetails.style';
import { StyledDetailTitle, StyledCardDetail } from './DetailsCommonStyle';


interface ICardCharactedDetailsProps {
  character: ICharacter
}

const CardCharacterOriginDetails: FC<any> = ({ character, handleSetSelectedItemToFetch }) => {
  if (character.origin.dimension === 'unknown') {
    return (    
      <StyledText>
        The origin is {character.origin?.name}, it's a {character.origin.type.toLowerCase()} situated in unknown dimension
      </StyledText>
    )
  }

  if (character.origin.name && character.origin.type && character.origin.dimension) {
    return (
     <StyledText>
          The origin is {character.origin?.name}, it's a {character.origin.type.toLowerCase()} situated in the
          <b>
            <StyleCardHighlightTextExtended 
              onClick={() => handleSetSelectedItemToFetch({ 
                params: {
                  name: character.origin.name.toLowerCase().replaceAll(' ', '-'),
                  id: character.origin.id,
                },
                type: 'location',
              })}
            > {character.origin.dimension}</StyleCardHighlightTextExtended>
          </b>
       </StyledText>
    );
  }

  return <StyledText>The origin is {character.origin?.name}</StyledText>;
}

interface ICardCharactedDetailssProps {
  props: number
}

const CardCharactedDetails: FC<ICardCharactedDetailssProps> = ({ props }) => {
  console.log('', props)
  const [character, setCharacter] = useState<any>(undefined);
  const [selectedItemToFetch, setSelectedItemToFetch] = 
  useState<{params: { name: string | null, id: string | null }, type: string | null}>({
    params: {
      name: null,
      id: null
    },
    type: null,
  });
  
  const { error, loading, data } = useQuery(LOAD_CHARACTER_BY_ID, {
    variables: { id: props },
  });
  
  const navigate = useNavigate();
  
  const characterFetched = data?.charactersByIds?.[0];

  useEffect(() => {
    if (!error && characterFetched) {
      setCharacter(characterFetched);
    }
  }, [characterFetched, error]);

  useEffect(() => {
    if (selectedItemToFetch.params.name && selectedItemToFetch.params.id && selectedItemToFetch.type) {
      console.log(selectedItemToFetch.params.id)
      navigate(`/${selectedItemToFetch.type}/${selectedItemToFetch.params.name}`, { state: selectedItemToFetch.params.id })
    }
  }, [selectedItemToFetch.params.name, selectedItemToFetch.params.id, selectedItemToFetch.type, navigate])


  let statusCharacter: string | ReactElement | undefined;
  let subjectCharacter: string | undefined;

  if (character) {
    statusCharacter = character.status;
    subjectCharacter = character.gender === 'Male' ? 'He' : 'She';
    
    if (character.gender === 'unknown') {
      subjectCharacter = 'It';
    }

    if (character.status === 'unknown') {
      statusCharacter = <>it's <b>Unknown</b> if {subjectCharacter.toLocaleLowerCase()} is alive or dead</>;
    }
  }

  return (
    <StyledCardDetail>
      {loading && <Loading title='character details' />}
      {error && <p>error</p>}
      {!error && character ? <>
        <StyledDetailTitle><>#{character.id} - {character.name} </></StyledDetailTitle>
        <StyleCharacterCardContainer>
          <StyledCharacterDetailImage src={character.image} />
          <StyleCardCharacterTextContainer>
            <StyleCardCharacterText> 
              <StyledText>
                <>{subjectCharacter} is <b>{character.species}</b> and {character.status === 'unknown' ? statusCharacter : <b>{character.status}</b>}</>
              </StyledText>
              <CardCharacterOriginDetails character={character} handleSetSelectedItemToFetch={setSelectedItemToFetch} />
              <StyledText>{`${subjectCharacter} is appeared in the following episodes:`}</StyledText>
              <StyledEpisodesList>
                {character.episode.map(({ id, episode, name }: {id: string, episode: string, name: string}) => (
                  <li
                    key={episode}
                    onClick={() => setSelectedItemToFetch({
                      params: { name: episode, id },
                      type: 'episode',
                    })}
                  >
                    {episode} - {name}
                  </li>
                ))}
              </StyledEpisodesList>
            </StyleCardCharacterText> 
          </StyleCardCharacterTextContainer>
        </StyleCharacterCardContainer>
      </> : null}
    </StyledCardDetail>
  );
};

export default memo(CardCharactedDetails);