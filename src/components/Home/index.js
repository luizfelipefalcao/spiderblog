import React, { Component } from "react";
import firebase from "../../firebase";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {   
    firebase.app.ref("posts").on("value", (snapshot) => { 
      let state = this.state;
      state.posts = []; //comecando com array vazio

      snapshot.forEach((childItem) => {
        state.posts.push({ //jogando no array 'post' os itens que vieram do database
          key: childItem.key,
          titulo: childItem.val().titulo,
          image: childItem.val().image,
          descricao: childItem.val().descricao,
          autor: childItem.val().autor,
        });
      });
      state.posts.reverse(); //metodo para lancar o post do mais recente para o mais antigo
      this.setState(state); //atualizando a state post
    });
  }

  render() {
    return (
      <section id="post">
        {this.state.posts.map((post) => { //mapeia o array post que ja esta preenchido
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
