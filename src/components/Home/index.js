import React, { Component } from "react";
import firebase from "../../firebase";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      nome: ''
    };
  }

  componentDidMount() {   
    firebase.app.ref("posts").on("value", (snapshot) => {
      let state = this.state;
      state.posts = [];

      snapshot.forEach((childItem) => {
        state.posts.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          image: childItem.val().image,
          descricao: childItem.val().descricao,
          autor: childItem.val().autor,
        });
      });
      state.posts.reverse();
      this.setState(state);
    });
// console.log('local: '+localStorage.nome);
//     firebase.getUserName((info) => {
//       //Se tiver logado pegue o usuario do firebase.
//       localStorage.nome = info.val().nome;
//       let state = this.state;
//       state.nome = localStorage.nome;
//       this.setState(state);
// console.log("1 nome: " + this.state.nome);
//     });
  }

  render() {
    return (
      <section id="post">
        {this.state.posts.map((post) => {
          return (
            <article key={post.key}>
              <header>
                <div className="title">
                  <strong>{post.titulo}</strong>
                  <span>Author: {post.autor}</span>
                </div>
              </header>
              <img src={post.image} alt="Capa do post" />
              <footer>
                <p>{post.descricao}</p>
              </footer>
            </article>
          );
        })}
      </section>
    );
  }
}

export default Home;
