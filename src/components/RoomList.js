import React, { Component } from "react";
import { throws } from "assert";
import { runInThisContext } from "vm";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      name: "",
      newRoomName: "",
      updateRoomName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.handleRename = this.handleRename.bind(this);

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }
  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
    this.roomsRef.on("child_removed", snapshot => {
      this.setState({ rooms: this.state.rooms.filter(room => room.key !== snapshot.key) });
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

  deleteRoom(key) {
    let roomsRef = this.props.firebase.database().ref("rooms/" + key);
    roomsRef.remove();
  }

  handleRename(event, key) {
    event.preventDefault();
    let roomsRef = this.props.firebase.database().ref("rooms/" + key);
    roomsRef.update({
      name: this.state.updateRoomName,
    });
    this.setState({ updateRoomName: "" });
  }
  /*let roomsRef = this.props.firebase.database().ref("rooms/" + key);
  roomsRef.set({
    name: this.state.updateRoomName,
  });
  this.setState({ updateRoomName: "" });*/

  render() {
    return (
      <section className='roomlist'>
        {this.state.rooms.map((room, index) => (
          <div className='room' key={"room" + index}>
            <button key={"setActiveRoom" + index} onClick={() => this.props.setActiveRoom(room)}>
              {room.name}
            </button>
            <button key={"deleteRoom" + index} onClick={() => this.deleteRoom(room.key)}>
              x
            </button>
            <form
              onSubmit={event => {
                this.handleRename(event, room.key);
              }}
            >
              <label>
                Rename Room:
                <input type='text' name='name' />
              </label>
              <input type='submit' value='Submit' />
            </form>
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
