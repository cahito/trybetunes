import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Editar Perfil do usuário</p>
      </div>
    );
  }
}
export default ProfileEdit;
