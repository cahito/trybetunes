import React from 'react';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Perfil do usuário</p>
      </div>
    );
  }
}
export default Profile;
