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

/* <label htmlFor="userName" id="userName">
Nome:
{' '}
<input name="userName" type="text" placeholder="Usuário" />
</label>
<label htmlFor="userEmail" id="userEmail">
E-mail:
{' '}
<input name="userEmail" type="email" placeholder="usuario@user_email.com" />
</label>
<label htmlFor="userDesc" id="userDesc">
Descrição:
{' '}
<textarea name="userDesc" type="text" placeholder="Usuário" />
</label> */
