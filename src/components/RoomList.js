import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      name: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);

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

  createRoom(newRoomName) {
    this.roomsRef.push({
      name: newRoomName,
    });
    this.setState({ newRoomName: [] });
  }

  render() {
    return (
      <section className='roomlist'>
        {this.state.rooms.map((room, index) => (
          <div className='room' key={index}>
            <button key={index} onClick={() => this.props.setActiveRoom}>
              {room.name}
            </button>
          </div>
        ))}

        <form
          onSubmit={event => {
            event.preventDefault();
            this.createRoom(this.state.newRoomName);
          }}
        >
          <label>
            Create New Room:
            <input type='text' value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </section>
    );
  }
}

export default RoomList;
