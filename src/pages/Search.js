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
      loading: true,
    }, async () => {
      const response = await searchAlbumsAPI(artist);
      console.log(response);
      this.setState({
        loading: false,
        nameSearch: '',
        response,
      }, this.validate);
    });
  }

  render() {
    const {
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

    return (
      <div data-testid="page-search">
        <Header />
        <section className="search-container">
          {loading ? <Loading /> : inputArea}
        </section>
        <section className="card-container">
          {/* <p>
            Resultado de álbuns de:
            {' '}
            {artistName}
          </p> */}
          {response
            .map(({ artistName, artworkUrl100, collectionId, collectionName }) => (
              <Card
                key={ collectionId }
                id={ collectionId }
                artistName={ artistName }
                artworkUrl100={ artworkUrl100 }
                collectionName={ collectionName }
              />
            ))}
        </section>
      </div>
    );
  }
}

export default Search;
