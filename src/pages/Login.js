import React from 'react';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      btnDisabled: true,
      redirect: false,
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  }

  validate = () => {
    const MIN_LENGTH_VALUE = 3;
    const { nameInput } = this.state;

    if (nameInput.length >= MIN_LENGTH_VALUE) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  handleLogin = () => {
    const { nameInput } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: nameInput });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  render() {
    const { nameInput, btnDisabled, redirect, loading } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-login" className="login-container">
        <p>Imagem teste</p>
        <input
          className="input-name"
          data-testid="login-name-input"
          placeholder="Nome"
          name="nameInput"
          type="text"
          value={ nameInput }
          onChange={ this.handleChange }
        />
        <button
          className="login-btn"
          data-testid="login-submit-button"
          disabled={ btnDisabled }
          type="button"
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
