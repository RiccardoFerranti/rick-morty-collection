import { FC } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css';

import { 
  StyledCard,
  StyleCardTextContainer,
  StyledCharacterTitle,
  StyleCardContainer,
  StyleCardText,
  StyleCardSeparator,
  StyledCharacterImage,
} from "./CardCharacter.style";
import GenderCharacter from './GenderCharacter';

import { StyleTextHighlight } from '../CommonStyle.style';

import { ICharacter } from '../../models';
import characterPlaceholder from "../../images/character-placeholder.jpeg";

export interface ICardCharacterProps {
  character: ICharacter
}

const CardCharacter: FC<ICardCharacterProps> = ({ character }) => {
  const { id, name, image, species, status, episode, gender } = character;

  return (
    <StyledCard data-testid={`card-character-${name.toLowerCase().replaceAll(' ', '-')}`}>
      <StyledCharacterTitle data-testid="card-character-title">
        <span><span>#{id}</span> - {name}</span>
        <GenderCharacter gender={gender} />
      </StyledCharacterTitle>
      <StyleCardContainer>
        <StyledCharacterImage src={image || characterPlaceholder} realSize={false} />
        <StyleCardTextContainer>
          <StyleCardText> 
            <StyleTextHighlight>{species}</StyleTextHighlight>
            {(status !== 'unknown') && <StyleCardSeparator> -- </StyleCardSeparator>}
            {(status !== 'unknown') && <StyleTextHighlight>{status}</StyleTextHighlight>}
          </StyleCardText>
          <StyleCardText>
            {(status === 'unknown') && <>Unknown if alive or dead</>}
          </StyleCardText>
          {(episode.length > 1) 
            ? <>
                <StyleCardText>{`Present from ${episode[0].episode} to ${episode[episode.length - 1].episode}`}</StyleCardText>
              </>
            : <StyleCardText>{`Present just in ${episode[0].episode}`}</StyleCardText>
          }
        </StyleCardTextContainer>
      </StyleCardContainer>
    </StyledCard>
  )
}

export default CardCharacter;
