import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Album.css';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
      musicList: [],
    };
  }

  componentDidMount() {
    this.creatAlbum();
  }

  creatAlbum = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musicList = await getMusics(id);
    console.log(musicList);
    this.setState({
      musicList,
      artistName: musicList[0].artistName,
      collectionName: musicList[0].collectionName,
      artworkUrl100: musicList[0].artworkUrl100,
    });
  };

  render() {
    const { artistName, artworkUrl100, collectionName, musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section className="album-container">
          <div className="album-description">
            <img
              alt={ `Album cover from ${artistName}'s ${collectionName}` }
              className="album-img"
              src={ artworkUrl100 }
            />
            <h3 data-testid="album-name">{ collectionName }</h3>
            <h5 data-testid="artist-name">{ artistName }</h5>
          </div>
          <div className="music-list">
            {
              // console.log(musicList)
              musicList
                .filter((music) => music.kind === 'song')
                .map((music, idx) => (
                  <MusicCard
                    key={ idx }
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                  />))
            }
          </div>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};

export default Album;
