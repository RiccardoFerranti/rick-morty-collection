import { FC } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

import { StyledBackButton, StyledButtonWrapper } from './Detail.style';

import CardCharactedDetails from '../components/Details/CharacterCardDetails';
import CardEpisodeDetails from '../components/Details/EpisodeCardDetails';
import CardLocationDetails from '../components/Details/LocationCardDetails';
import Layout from '../Layout/Layout';

const Detail: FC = () => {
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
    <Layout>
      <StyledButtonWrapper>
        <StyledBackButton 
          type='button'
          id='list-character-button'
          onClick={() => navigate(-1)}
          data-testid='list-character-butto'
        >
          <IoMdArrowBack />
          <span>BACK</span>
        </StyledBackButton>
        <StyledBackButton 
          type='button'
          id='list-character-button'
          onClick={() => navigate('/')}
          data-testid='list-character-butto'
        >
          <span>BACK TO CHARACTERS LIST</span>
        </StyledBackButton>
      </StyledButtonWrapper>
      {DetailComponent ? <DetailComponent props={state} /> : null}
    </Layout>
  )
}

export default Detail;