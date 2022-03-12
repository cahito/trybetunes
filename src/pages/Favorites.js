import React from 'react';
import './Favorites.css';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
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

  componentDidUpdate() {
    console.log('atualizou o favorite');
  }

  render() {
    const { favSongs, loading } = this.state;
    const renderedFavs = (
      <div className="fav-list">
        {
          favSongs.map((music) => (
            <MusicCard
              isFavSong
              key={ music.trackId }
              kind={ music.kind }
              previewUrl={ music.previewUrl }
              trackName={ music.trackName }
              trackId={ music.trackId }
            />
          ))
        }
      </div>
    );

    return (
      <div data-testid="page-favorites">
        <Header />
        <section className="favorite-container">
          { loading
            ? <Loading />
            : renderedFavs }
        </section>
      </div>
    );
  }
}
export default Favorites;
