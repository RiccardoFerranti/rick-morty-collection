import { FC } from "react";

import 'react-lazy-load-image-component/src/effects/blur.css';

import { StyledDetailCardCharacterImage } from "./DetailsCommon.style";
import { StyledText } from "./CharacterCardDetails.style";
import { StyledCharactersList } from "./CharactersListDetails.style";

import characterPlaceholder from "../../images/character-placeholder.jpeg";
import loadingSpinner from "../../images/loading.svg";
import { IResident } from "../../models";


export interface ICharactersListDetailsProps {
  characters: Array<IResident>,
  handleSetSelectedRecordToFetch: (x: {name: string | null, id: string | null}) => void,
  loadingImages: boolean
}

const CharactersListDetails: FC<ICharactersListDetailsProps> = props => {
  const { characters, handleSetSelectedRecordToFetch, loadingImages } = props;

  return (
    <StyledCharactersList>
      {loadingImages ? <img src={loadingSpinner} alt='loading icon' title='loading spinned' data-testid='spinner-icon' /> : null}
      {!characters.length ? <StyledText> -- Nobody -- </StyledText> : null}
      {!loadingImages && characters.map(({ id, image, name }: { id: string, image: string, name: string }) => {
        // load a character placeholder in case the image is not available
        const characterImage = image || characterPlaceholder;

        return (
          <li 
            key={`${name}-${id}`}
            data-testid={`character-list-detail-image-${id}`}
            onClick={() => handleSetSelectedRecordToFetch({ name, id })}
          >
            <StyledDetailCardCharacterImage src={characterImage} effect='blur' />
            <p>{name}</p>
          </li>
        )
      }
    )}
    </StyledCharactersList>
  )
}

export default CharactersListDetails
