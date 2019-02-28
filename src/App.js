import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "../src/components/RoomList";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCV2CZ-jRYiUKoBbXC1cOSCkfsR_PE38uU",
  authDomain: "bloc-chat-react-2c53a.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-2c53a.firebaseio.com",
  projectId: "bloc-chat-react-2c53a",
  storageBucket: "bloc-chat-react-2c53a.appspot.com",
  messagingSenderId: "971450421211",
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <header>
        <p>Bloc Chat React</p>
        <RoomList firebase={firebase} />
      </header>
    );
  }
}

export default App;
