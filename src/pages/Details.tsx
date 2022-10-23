import { FC } from 'react';

import { useLocation, useNavigate} from 'react-router-dom';

import { StyledBackButton, StyledButtonWrapper } from './Details.style';

import CardCharactedDetails from '../components/Details/CharacterCardDetails';
import CardEpisodeDetails from '../components/Details/EpisodeCardDetails';
import CardLocationDetails from '../components/Details/LocationCardDetails';
import BackButton from '../components/Buttons/BackButton';

const Details: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { state, pathname } = location;

  let DetailComponent: React.ElementType;

  const pathNameArray = pathname.split('/');

  if (pathNameArray.includes('character')) {
    DetailComponent = CardCharactedDetails;
  } else if (pathNameArray.includes('episode')) {
    DetailComponent = CardEpisodeDetails;
  } else {
    DetailComponent = CardLocationDetails;
  }

  return (
    <>
      <StyledButtonWrapper>
        <BackButton />
        <StyledBackButton 
          type='button'
          id='details-list-characters-button'
          onClick={() => navigate('/')}
          data-testid='details-list-characters-button'
        >
          <span>BACK TO CHARACTERS LIST</span>
        </StyledBackButton>
      </StyledButtonWrapper>
      <>{DetailComponent ? <DetailComponent id={state} /> : null}</>
    </>
  )
}

export default Details;