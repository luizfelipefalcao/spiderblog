import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      nome: ''
    };

    this.entrar = this.entrar.bind(this);
    this.login = this.login.bind(this);
  }


  componentDidMount() {
    //Se tem usuario logado, direcione para '/'
    if (firebase.getCurrent()) { 
      return this.props.history.push("/");
    }

  }

  entrar(e) {
    e.preventDefault();
   
    this.login();
    
    return this.props.history.push("/");


  }

  login = async () => {
    const { email, password } = this.state;

    try { //Trata o login conforme o que digitado pelo usuario
      await firebase.login(email, password).catch((error) => {
        if (error.code === "auth/user-not-found") {
          alert("Este usuario não existe!");
        } else {
          alert("Codigo de erro:" + error.code);
          return null;
        }
      });


    } catch (error) {
      alert(error.message);
    }
    
    window.location.reload();


  };

  render() {
    return (
      <div>
        <form onSubmit={this.entrar} id="login">
          <label>Email:</label>
          <br />
          <input
            type="email"
            autoComplete="off"
            autoFocus
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="Type your email..."
          />
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            autoComplete="off"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="Type your password..."
          />
          <br />

          <button type="submit">Log in</button>
          <Link to="/register">Have an account? Sign in!</Link>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
