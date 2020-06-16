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

  login(email, password) {
    return app.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return app.auth().signOut();
  }

  async register(nome, email, password) {
    await app.auth().createUserWithEmailAndPassword(email, password);

    const uid = app.auth().currentUser.uid;

    return app.database().ref("users").child(uid).set({
      nome: nome,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      app.auth().onAuthStateChanged(resolve);
    });
  }

  getCurrent() {
    return app.auth().currentUser && app.auth().currentUser.email;
  }

  getCurrentUid() {
    return app.auth().currentUser && app.auth().currentUser.uid;
  }

  async getUserName(callback) {
    if (!app.auth().currentUser) {
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref("users").child(uid).once("value").then(callback);
  }
}

export default new Firebase();
