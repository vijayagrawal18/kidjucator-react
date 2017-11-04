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

export const database = Rebase.createClass(store.database());

export default store;
