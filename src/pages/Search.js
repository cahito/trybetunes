import React from 'react';
import Header from '../components/Header';
import './Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSearch: '',
      btnDisabled: true,
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

  render() {
    const { btnDisabled, nameSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <section className="search-container">
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
        </section>
      </div>
    );
  }
}
export default Search;
