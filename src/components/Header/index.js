import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from '../../firebase';
import "./header.css";

import {BsPerson, BsBoxArrowRight} from 'react-icons/bs';
import spider from "../../assets/spider.jpg";
import spiderblog from "../../assets/spiderblog.png";

class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      nome: '',
    };

    this.sair = this.sair.bind(this);
    this.logout = this.logout.bind(this);
  }

  //Funcao verifica se o usuario esta logado
  componentDidMount() { 
    if (!firebase.getCurrent()) { //Caso nao tenha usuario logado, va pra pagina '/'.
      this.props.history.replace("/");
      return null;
    }
    firebase.getUserName((info) => { //Se tiver logado pegue o usuario do firebase, usando a callback
      localStorage.nome = info.val().nome;
      this.setState({ nome: localStorage.nome });
    });
  }

  sair(e){
    e.preventDefault();
  
    this.logout();
  }

  logout = async () => {
    await firebase.logout().catch((error) => {
      console.log(error);
    });
    localStorage.removeItem("nome");
    this.setState({nome: ''});
    this.props.history.push("/");
  };

  render(){
    return (
      <section>
        <div className="background-foto">
          <img src={spider} alt="spider" />
        </div>
        <header id="main-header">
          <div className="header-content">
            <Link to="/"><img src={spiderblog} alt="spiderblog" /></Link>
            <div>
              {this.state.nome === ''
              ?
              <div className='cst-menu'>
                <Link to="/login" className='cst-text'>Login<BsPerson size={33}/></Link>
                <Link to="/register" className='cst-signup'>Sign Up</Link>
              </div>
              :
              <div className='cst-menu'>
                <Link to="/dashboard" className='cst-newpost'>New Post</Link>
                <Link to="/" className='cst-text' onClick={this.sair}>Logout<BsBoxArrowRight size={30}/></Link>
              </div>
              }
            </div>
          </div>
        </header>
      </section>
    )
  }
}

export default withRouter(Header);
