import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <section className="navbar">
        <NavLink to="/search" activeClassName="selected">Pesquisa</NavLink>
        <NavLink to="/favorites" activeClassName="selected">Favoritas</NavLink>
        <NavLink exact to="/profile" activeClassName="selected">Perfil</NavLink>
      </section>
    );
  }
}

export default NavBar;
