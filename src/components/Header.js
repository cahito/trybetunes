import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    this.fetchUser();

    return (
      <>
        <header data-testid="header-component" className="header">
          <h1>Cabeçalho</h1>
          {loading
            ? <Loading />
            : <p data-testid="header-user-name" className="username">{user.name}</p>}
        </header>
        <section className="navbar">
          <NavLink
            data-testid="link-to-search"
            to="/search"
            activeClassName="selected"
          >
            Pesquisa
          </NavLink>
          <NavLink
            data-testid="link-to-favorites"
            to="/favorites"
            activeClassName="selected"
          >
            Favoritas
          </NavLink>
          <NavLink
            data-testid="link-to-profile"
            exact
            to="/profile"
            activeClassName="selected"
          >
            Perfil
          </NavLink>
        </section>
      </>
    );
  }
}

export default Header;
