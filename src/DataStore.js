import Rebase from "re-base";
const firebase = require('firebase');

export const store = firebase.initializeApp({
    apiKey: "AIzaSyDnLoOqRjcahUEHNLdwHnnASVVwZA3t1qw",
    authDomain: "react-n-learn.firebaseapp.com",
    databaseURL: "https://react-n-learn.firebaseio.com",
    projectId: "react-n-learn",
    storageBucket: "react-n-learn.appspot.com",
    messagingSenderId: "521709009786"
});

export const login = (callback) => {
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth(
    ).signInWithPopup(provider
    ).then(authData => {
      callback(authData.user)
    }).catch(error => {
      console.log(error);
    })
}

export const logout = (callback) => {
  firebase.auth().signOut().then(callback).catch(error => console.log(error));
}

export const currentUser = (callback) => {
  firebase.auth().onAuthStateChanged(callback);

}
export const database = Rebase.createClass(store.database());

export default store;
