import { screen } from '@testing-library/react';
import renderWithProvider from '../../../../testUtils';

import CardCharacter, { ICardCharacterProps } from '../CardCharacter';

describe('CardCharacter', () => {
  let mockedProps: ICardCharacterProps;

  const renderView = (props: ICardCharacterProps) => renderWithProvider(<CardCharacter {...props} />);

  beforeEach(() => {
    mockedProps = {
      character: {
        id: 1,
        name: 'Rick Sanchez',
        species: 'Human',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        status: 'Alive',
        type: 'Human Type',
        origin: {
          id: null,
          dimension: null,
          name: "unknown",
          residents: [],
          type: null,
        },
        episode: [{
          id: '01',
          episode: 'S01E01',
          name: 'Pilot',
        }],
      }
    }
  })

  it('should render the card title properly', () => {
    renderView(mockedProps);

    expect(screen.getByText(`#${mockedProps.character.id}`)).toBeInTheDocument();
    expect(screen.getByText(`- ${mockedProps.character.name}`)).toBeInTheDocument();
  });

  it('should render the specie properly', () => {
    renderView(mockedProps);

    expect(screen.getByText(mockedProps.character.species)).toBeInTheDocument();
  });

  it('should render the status properly when it\'s not unknown', () => {
    renderView(mockedProps);

    expect(screen.getByText(mockedProps.character.status)).toBeInTheDocument();
  });

  it('should render the status properly when it\'s unknown', () => {
    mockedProps.character.status = 'unknown';
    renderView(mockedProps);

    expect(screen.getByText('Unknown if alive or dead')).toBeInTheDocument();
  });

  it('should render the episodes properly when just one episode is present', () => {
    renderView(mockedProps);

    expect(screen.getByText(`Present just in ${mockedProps.character.episode[0].episode}`)).toBeInTheDocument();
  });
  
  it('should render the episodes properly when at least 2 episodes are present', () => {
    mockedProps.character.episode = [
      { id: '01', episode: 'S01E01', name: 'Pilot'},
      { id: '01', episode: 'S01E01', name: 'Second episode'},
      { id: '03', episode: 'S01E03', name: 'Third episode'}
    ];
    renderView(mockedProps);

    const characterEpisode = mockedProps.character.episode;

    expect(screen.getByText(`Present from ${characterEpisode[0].episode} to ${characterEpisode[characterEpisode.length - 1].episode}`)).toBeInTheDocument();
  });
});
