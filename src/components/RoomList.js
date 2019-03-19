import React, { Component } from "react";
import { throws } from "assert";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      name: "",
      newRoomName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }
  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleChange(event) {
    this.setState({ newRoomName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.newRoomName) {
      return;
    }
    this.createRoom(this.state.newRoomName);
    this.setState({ newRoomName: "" });
  }

  createRoom() {
    if (!this.state.newRoomName || this.state.newRoomName.trim() == "") {
      return;
    }
    this.roomsRef.push({
      name: this.state.newRoomName,
    });
    this.setState({ name: "" });
  }

  render() {
    return (
      <section className='roomlist'>
        {this.state.rooms.map((room, index) => (
          <div className='room' key={index}>
            <button key={index} onClick={() => this.props.setActiveRoom(room)}>
              {room.name}
            </button>
          </div>
        ))}
        <form
          onSubmit={event => {
            this.handleSubmit(event);
          }}
        >
          <label>
            Create New Room:
            <input type='text' value={this.state.newRoomName} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </section>
    );
  }
}

export default RoomList;
