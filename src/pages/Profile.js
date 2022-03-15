import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import './Profile.css';
import { getUser } from '../services/userAPI';
import photoDefault from '../images/account_circle_24px.svg';
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
      const userName = fetchedUser.name;
      const userEmail = fetchedUser.email || 'usuario@useremail.com';
      const userPhoto = fetchedUser.image || photoDefault;
      const userDescr = fetchedUser.description || 'Loren ipsum';
      this.setState({
        user: {
          name: userName,
          email: userEmail,
          image: userPhoto,
          description: userDescr,
        },
        loading: false,
      });
    });
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
        <div className="profilePhoto">
          <img
            alt="Foto do usuário"
            className="photo"
            data-testid="profile-image"
            src={ image }
          />
          <NavLink
            className="edit-btn"
            to="/profile/edit"
          >
            Editar perfil
          </NavLink>
        </div>
        <div className="userData">
          <h3>Nome:</h3>
          <p>{ name }</p>
          <h3>E-mail:</h3>
          <p>{ email }</p>
          <h3>Descrição:</h3>
          <p>{ description }</p>
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
