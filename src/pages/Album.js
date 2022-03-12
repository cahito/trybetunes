import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Album.css';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      artworkUrl100: '',
      collectionName: '',
      favSongs: [],
      loading: false,
      musicList: [],
    };
  }

  componentDidMount() {
    this.creatAlbum();
    this.setState({
      loading: true,
    }, async () => {
      const favSongsList = await getFavoriteSongs();
      console.log(favSongsList);
      this.setState({
        favSongs: favSongsList,
        loading: false,
      });
    });
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
    const {
      artistName,
      artworkUrl100,
      collectionName,
      favSongs,
      loading,
      musicList,
    } = this.state;
    const renderedList = (
      <div className="music-list">
        {
          musicList
            .filter((music) => music.kind === 'song')
            .map((music) => (
              <MusicCard
                isFavSong={ favSongs.some((fav) => fav.trackId === music.trackId) }
                key={ music.trackId }
                kind={ music.kind }
                previewUrl={ music.previewUrl }
                trackName={ music.trackName }
                trackId={ music.trackId }
              />))
        }
      </div>);

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
            <h3 data-testid="album-name">{collectionName}</h3>
            <h5 data-testid="artist-name">{artistName}</h5>
          </div>
          {loading
            ? <Loading />
            : renderedList}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
