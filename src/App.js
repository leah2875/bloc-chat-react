import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "../src/components/RoomList";
import MessageList from "../src/components/MessageList";

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
  constructor(props) {
    super(props);
    this.state = {
      ActiveRoom: null,
      activeRoomId: "",
    };
  }
  setActiveRoom = roomSelected => {
    this.setState({ ActiveRoom: roomSelected });
  };

  render() {
    return (
      <header>
        <p>Bloc Chat React</p>
        <div classname='RoomList'>
          <RoomList setActiveRoom={this.setActiveRoom.bind(this)} firebase={firebase} />
        </div>

        <div className='MessageList'>
          <MessageList
            ActiveRoom={this.state.ActiveRoom}
            activeRoomId={this.state.activeRoomId}
            firebase={firebase}
          />
        </div>
      </header>
    );
  }
}

export default App;
