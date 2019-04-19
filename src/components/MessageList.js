import React, { Component } from "react";
import { throws } from "assert";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteMessage = this.handleDeleteMessage.bind(this);

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
    this.messagesRef.on("child_removed", snapshot => {
      this.setState({
        messages: this.state.messages.filter(message => message.key !== snapshot.key),
      });
    });
  }

  createMessage() {
    this.messagesRef.push({
      roomId: this.props.activeRoom.key,
      content: this.state.newMessage,
      username: this.props.username,
    });
  }

  handleChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.newMessage) {
      return;
    }
    this.createMessage(this.state.newMessage);
    this.setState({ newMessage: "" });
  }

  handleDeleteMessage(key) {
    let messagesRef = this.props.firebase.database().ref("messages/" + key);
    messagesRef.remove();
  }

  render() {
    const activeRoomId = this.props.activeRoomId;
    return (
      /*
    return <div className='ActiveRoom'>Current Room: {this.props.ActiveRoom.name}</div>;*/
      <section>
        <div className='messages'>
          <ul>
            {this.state.messages
              .filter(message => message.roomId === this.props.activeRoom.key)
              .map((message, index) => (
                <li key={index}>
                  {message.roomId} {message.content} {message.sentAt} {message.username}{" "}
                  <button
                    key={"handleDeleteMessage" + index}
                    onClick={() => this.handleDeleteMessage(message.key)}
                  >
                    x
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <form
          onSubmit={event => {
            this.handleSubmit(event);
          }}
        >
          <label>
            New Message:
            <input
              type='text'
              value={this.state.newMessage}
              onChange={event => this.handleChange(event)}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </section>
    );
  }
}

export default MessageList;
