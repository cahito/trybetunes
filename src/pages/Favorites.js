import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <NavBar />
        <p>Músicas favoritas</p>
      </div>
    );
  }
}
export default Favorites;
