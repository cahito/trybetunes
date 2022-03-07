import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <NavBar />
        <p>Perfil do usuário</p>
      </div>
    );
  }
}
export default Profile;
