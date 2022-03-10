import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      artistNotFound: false,
      btnDisabled: true,
      loading: false,
      nameSearch: '',
      response: [],
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  validate = () => {
    const MIN_LENGTH_VALUE = 2;
    const { nameSearch } = this.state;

    if (nameSearch.length >= MIN_LENGTH_VALUE) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleSearch = () => {
    const { nameSearch } = this.state;
    const artist = nameSearch;
    this.setState({
      artistNotFound: false,
      loading: true,
    }, async () => {
      const response = await searchAlbumsAPI(artist);
      if (response.length === 0) {
        this.setState({
          artistNotFound: true,
        });
      }
      this.setState({
        artist,
        loading: false,
        nameSearch: '',
        response,
      }, this.validate);
    });
  }

  render() {
    const {
      artist,
      artistNotFound,
      btnDisabled,
      loading,
      nameSearch,
      response,
    } = this.state;
    const inputArea = (
      <>
        <input
          className="search-name"
          data-testid="search-artist-input"
          name="nameSearch"
          onChange={ this.handleChange }
          type="text"
          value={ nameSearch }
        />
        <button
          className="seach-btn"
          data-testid="search-artist-button"
          disabled={ btnDisabled }
          onClick={ this.handleSearch }
          type="button"
        >
          Pesquisar
        </button>
      </>);
    const textResult = (
      <p>
        Resultado de álbuns de:
        {' '}
        {artist}
      </p>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <section className="search-container">
          {loading ? <Loading /> : inputArea}
        </section>
        {response.length === 0
          ? ''
          : textResult}
        <section className="card-container">

          {
            artistNotFound
              ? <p>Nenhum álbum foi encontrado</p>
              : response
                .map(({ artistName, artworkUrl100, collectionId, collectionName }) => (
                  <Card
                    key={ collectionId }
                    collectionId={ collectionId }
                    artistName={ artistName }
                    artworkUrl100={ artworkUrl100 }
                    collectionName={ collectionName }
                  />
                ))
          }
        </section>
      </div>
    );
  }
}

export default Search;
