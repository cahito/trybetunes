import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import './Profile.css';
import { getUser } from '../services/userAPI';
// import PhotoDefault from '../images/account_circle_24px.svg';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const fetchedUser = await getUser();
      console.log(fetchedUser);
      this.setState((prevState) => ({
        user: {
          name: fetchedUser.name,
          email: prevState.email,
          image: prevState.image,
          description: prevState.description,
        },
        loading: false,
      }));
    });
  }

  handleEdit = () => {

  }

  render() {
    const {
      loading,
      user: {
        name,
        email,
        image,
        description,
      },
    } = this.state;
    const userForm = (
      <>
        <div className="userPhoto">
          <img alt="Foto do usuário" data-testid="profile-image" src={ image } />
          <NavLink
            className="edit-btn"
            to="/profile/edit"
          >
            Editar perfil
          </NavLink>
        </div>
        <div className="userData">
          <h3>Nome:</h3>
          <p>{name}</p>
          <h3>E-mail:</h3>
          <p>{email}</p>
          <h3>Descrição:</h3>
          <p>{description}</p>
        </div>
      </>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        <section className="profile-container">
          { loading
            ? <Loading />
            : userForm }
        </section>
      </div>
    );
  }
}

export default Profile;

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
