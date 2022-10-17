import { FC } from 'react'

import { 
  StyledCard,
  StyleCardTextContainer,
  StyledCharacterTitle,
  StyleCardContainer,
  StyleCardText,
  StyleCardSeparator,
  StyledCharacterImage
} from "./CardCharacter.style";

import { StyleTextHighlight } from '../CommonStyle.style';
import { ICharacter } from '../../model';

interface ICardCharacterProps {
  character: ICharacter
}

const CardCharacter: FC<any> = ({ character }) => {
  const { id, name, image, species, status, episode } = character;

  return (
    <StyledCard>
      <StyledCharacterTitle><span>#{id}</span> - {name}</StyledCharacterTitle>
      <StyleCardContainer>
        <StyledCharacterImage src={image} realSize={false} />
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
