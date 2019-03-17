import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.signIn()}>Sign In</button>
        <button onClick={() => this.signOut()}>Sign Out</button>
        <p>{this.props.user ? this.props.user.displayName : "Guest"}</p>
      </div>
    );
  }
}

export default User;
