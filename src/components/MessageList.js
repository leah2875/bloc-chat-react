import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
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
                  {message.roomId} {message.content} {message.sentAt} {message.username}
                </li>
              ))}
          </ul>
        </div>
      </section>
    );
  }
}

export default MessageList;
