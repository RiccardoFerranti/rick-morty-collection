import { FC } from "react";
import { 
  StyledAiOutlineQuestionCircle,
  StyledBsGenderFemale,
  StyledBsGenderMale,
  StyledRiGenderlessLine
} from "./GenderCharacter.style";

export interface IGenderCharacterProps {
  gender: string,
}

const GenderCharacter: FC<IGenderCharacterProps> = ({ gender }) =>  {
  let GenderIcon: React.ElementType | undefined;

  switch(gender.toLocaleLowerCase()){
    case 'male': {
      GenderIcon = StyledBsGenderMale;
      break;
    }
    
    case 'female': {
      GenderIcon = StyledBsGenderFemale;
      break;
    }

    case 'genderless': {
      GenderIcon = StyledRiGenderlessLine;
      break;
    }

    case 'unknown': {
      GenderIcon = StyledAiOutlineQuestionCircle;
      break;
    }
  }

  if (!GenderIcon) return null;

  return (
    <GenderIcon data-testid={`gender-icon-${gender}`} />
  )
}

export default GenderCharacter;