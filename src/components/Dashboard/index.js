import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: localStorage.nome,
    };

    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    if (!firebase.getCurrent()) {
      this.props.history.replace("/login");
      return null;
    }

    firebase.getUserName((info) => {
      localStorage.nome = info.val().nome;
      this.setState({ nome: localStorage.nome });
    });
  }

  logout = async () => {
    await firebase.logout().catch((error) => {
      console.log(error);
    });
    localStorage.removeItem("nome");
    this.props.history.push("/");
  };

  render() {
    return (
      <div id="dashboard">
        <div className="user-info">
          <h1>Hello again, {this.state.nome}</h1>
        </div>
        <div>
          <br />
          <br />
          <div className='btn-post'>
            <button className="btn-newpost">
              <Link to="/dashboard/new">New post</Link>
            </button>
          </div>
          <br />
          <br />
          <div className='btn-post'>
            <button onClick={() => this.logout()} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
