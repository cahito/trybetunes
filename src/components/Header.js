import React from 'react';
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
      <header data-testid="header-component" className="header">
        <h1>Cabeçalho</h1>
        { loading
          ? <Loading />
          : <p data-testid="header-user-name" className="username">{ user.name }</p>}
      </header>
    );
  }
}

export default Header;
