import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';


class Register extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: '',
      email: '',
      password: ''
    };

    this.register = this.register.bind(this);
    this.onRegister = this.onRegister.bind(this);

  }

  register(e){
    e.preventDefault();

    this.onRegister();
  }

  onRegister = async() => {
    try{
      const {nome, email, password} = this.state;

      await firebase.register(nome, email, password);
      window.location.reload();
      this.props.history.replace('/');

    }catch(error){
      alert(error.message);
    }
  }

  render(){
    return(
      <div>
        <h1 className="register-h1">New Account</h1>
        <form onSubmit={this.register} id="register">
          <label>Name:</label><br/>
          <input type="text" value={this.state.nome} autoFocus autoComplete="off"
          onChange={(e)=> this.setState({nome: e.target.value})} placeholder="Type your name.."/><br/>

          <label>Email:</label><br/>
          <input type="text" value={this.state.email} autoComplete="off"
          onChange={(e)=> this.setState({email: e.target.value})} placeholder="Type your best email.." /><br/>

          <label>Password:</label><br/>
          <input type="password" value={this.state.password} 
          onChange={(e)=> this.setState({password: e.target.value})}/><br/>

          <button type="submit">Register</button>

        </form>
        
      </div>
    );
  }
}

export default withRouter(Register);