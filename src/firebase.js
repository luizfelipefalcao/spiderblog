import app from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

let firebaseConfig = {
  apiKey: "AIzaSyDjvx3HY3Vh3t13kP5ayby9iGTJQShHNAw",
  authDomain: "spiderblog-5b0bc.firebaseapp.com",
  databaseURL: "https://spiderblog-5b0bc.firebaseio.com",
  projectId: "spiderblog-5b0bc",
  storageBucket: "spiderblog-5b0bc.appspot.com",
  messagingSenderId: "742219900560",
  appId: "1:742219900560:web:6b0dc7028db39f47a39a15",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    //Referenciando a database para acessar em outros locais
    this.app = app.database();

    this.storage = app.storage();
  }

  //Metodo para fazer o login no Firebase, usando dois parametros que vai vir do usuario
  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  //Metodo padrao para logout da autenticacao do Firebase
  logout() {
    return app.auth().signOut();
  }

  //Metodo para registrar novo usuario com esses parametros, agindo na autenticacao do Firebase
  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password);

    //autentica pegando o uid do usuario criado
    const uid = app.auth().currentUser.uid;

    //retorna um novo parametro 'nome' no database do Firebase atraves da autenticacao
    return app.database().ref("users").child(uid).set({
      nome: nome,
    });
  }

  //Verifica se foi inicializado, usando a Promisse com o parametro 'resolve'
  isInitialized() {
    return new Promise((resolve) => {
      app.auth().onAuthStateChanged(resolve);
    });
  }

  //Retorna usuario atual e email atual
  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  //Retorna usuario atual e uid atual
  getCurrentUid() {
    return app.auth().currentUser && app.auth().currentUser.uid;
  }

  async getUserName(callback) {
    if (!app.auth().currentUser) { //Se nao existe usuario logado retorne null
      return null;
    }

    //senao pegue da tabela 'users' o nome do usuario atual
    const uid = app.auth().currentUser.uid;
    await app.database().ref("users").child(uid).once("value").then(callback);
  }
}

export default new Firebase();
