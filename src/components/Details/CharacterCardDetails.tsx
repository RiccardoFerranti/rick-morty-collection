import { FC, memo, useEffect, useState, ReactElement } from 'react';

import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

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


import Loading from '../Loading/Loading';

import characterPlaceholder from "../../images/character-placeholder.jpeg";
import { LOAD_CHARACTER_BY_ID } from '../../GraphQL/Queries';
import { ICharacter  } from '../../models';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export interface IHandleSetSelectedItemToFetchParams {
  params: {
    name: string,
    id: string
  },
  type: string
}
export interface ICardCharacterOriginDetailsProps {
  character: ICharacter
  handleSetSelectedItemToFetch: (x: IHandleSetSelectedItemToFetchParams) => void,
}

export const CardCharacterOriginDetails: FC<ICardCharacterOriginDetailsProps> = ({ character, handleSetSelectedItemToFetch }) => {
  if (character.origin.dimension === 'unknown') {
    return (    
      <StyledText>
        The origin is {character.origin?.name}, it's a {character.origin.type !== null && character.origin.type.toLowerCase()} situated in unknown dimension
      </StyledText>
    )
  }

  if (character.origin.id && character.origin.name && character.origin.type && character.origin.dimension) {
    return (
     <StyledText>
          The origin is {character.origin?.name}, it's a {character.origin.type.toLowerCase()} situated in the
          <b>
            <StyleCardHighlightTextExtended 
              onClick={() => handleSetSelectedItemToFetch({ 
                params: {
                  name: character.origin.name.toLowerCase().replaceAll(' ', '-'),
                  id: character.origin.id!,
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

// export interface ICardCharacterDetailsProps {
//   id: number
// }

const CardCharacterDetails: FC = () => {
  const [character, setCharacter] = useState<ICharacter | undefined>(undefined);
  const [selectedItemToFetch, setSelectedItemToFetch] = useState<
    { params: { name: string | null, id: string | null },
    type: string | null}
  >({
    params: { name: null, id: null },
    type: null,
  });

  const { id } = useParams();

  const { error, loading, data } = useQuery(LOAD_CHARACTER_BY_ID, {
    variables: { id },
  });

  const navigate = useNavigate();
  
  let characterImage = '';
  const characterFetched = data?.charactersByIds?.[0];

  useEffect(() => {
    if (!error && characterFetched) {
      setCharacter(characterFetched);
    }
  }, [characterFetched, error]);

  useEffect(() => {
    if (selectedItemToFetch.params.name && selectedItemToFetch.params.id && selectedItemToFetch.type) {
      navigate(`/rick-morty-collection/${selectedItemToFetch.type}/${selectedItemToFetch.params.name}`, { state: selectedItemToFetch.params.id })
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

  if (loading) {
    return <Loading title='character' />
  }
  
  if (error) {
    return <ErrorMessage error={error} />
  }

  if (character?.image) {
    // load a character placeholder in case the image is not available
    characterImage = character.image !== null ? character.image : characterPlaceholder;
  }

  return (
    <StyledCardDetail>
      {character ? <>
        <StyledDetailTitle><>#{character.id} - {character.name}</></StyledDetailTitle>
        <StyleCharacterCardContainer>
          <StyledCharacterDetailImage src={characterImage} />
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

export default memo(CardCharacterDetails);
