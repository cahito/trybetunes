import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <NavBar />
        <p>As coisas tudo que precisa</p>
      </div>
    );
  }
}
export default Search;
