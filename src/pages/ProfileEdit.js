import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import photoDefault from '../images/account_circle_24px.svg';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: true,
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  componentDidMount() {
    this.createUser();
    console.log('DidMount');
  }

  createUser = () => {
    this.setState({
      loading: true,
    }, async () => {
      const fetchedUser = await getUser();
      console.log(fetchedUser);
      const userName = fetchedUser.name;
      const userEmail = fetchedUser.email;
      const userPhoto = fetchedUser.image || photoDefault;
      const userDescr = fetchedUser.description;
      this.setState({
        name: userName,
        email: userEmail,
        image: userPhoto,
        description: userDescr,
        loading: false,
      });
    });
  }

  handleOnChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  validate = () => {
    const {
      name,
      email,
      photo,
      description,
    } = this.state;
    const array = [name, email, photo, description];
    const allFilled = array.every((each) => (each !== undefined));
    console.log(array);
    console.log(allFilled);
    if (allFilled) {
      this.setState({
        btnDisabled: false,
      });
    }
  }

  handleSave = async () => {
    const { name, email, image, description } = this.state;
    const user = {
      name,
      email,
      image,
      description,
    };
    this.setState({
      loading: true,
    }, async () => {
      await updateUser(user);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const {
      btnDisabled,
      loading,
      name,
      email,
      image,
      description,
    } = this.state;
    const editForm = (
      <>
        <div className="userPhoto">
          <img
            alt="Foto do usuário"
            className="photo"
            src={ image }
          />
          <label htmlFor="image">
            Trocar a sua foto:
            <input
              data-testid="edit-input-image"
              name="image"
              placeholder="Link do arquivo da foto"
              type="text"
              value={ image }
              onChange={ this.handleOnChange }
            />
          </label>
        </div>
        <label htmlFor="name" id="userName">
          Nome:
          {' '}
          <input
            data-testid="edit-input-name"
            name="name"
            type="text"
            value={ name }
            onChange={ this.handleOnChange }
          />
        </label>
        <label htmlFor="email" id="userEmail">
          E-mail:
          {' '}
          <input
            data-testid="edit-input-email"
            name="email"
            type="email"
            placeholder="usuario@user_email.com"
            value={ email }
            onChange={ this.handleOnChange }
          />
        </label>
        <label htmlFor="description" id="userDesc">
          Descrição:
          {' '}
          <textarea
            data-testid="edit-input-description"
            cols={ 35 }
            name="description"
            type="text"
            placeholder="Descrição do usuário"
            rows={ 5 }
            value={ description }
            onChange={ this.handleOnChange }
          />
        </label>
        <button
          data-testid="edit-button-save"
          type="button"
          className="saveBtn"
          disabled={ btnDisabled }
          onClick={ this.handleSave }
        >
          Salvar
        </button>
      </>
    );

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <section className="profile-container">
          {loading
            ? <Loading />
            : editForm}
        </section>
      </div>
    );
  }
}
export default ProfileEdit;
