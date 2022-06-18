import './../styles/room.css';

const Room = ({id, name, selectRoom}) => {

    return (
        <button className="room" type="button" onClick={() => selectRoom(id)}>
            {name}
        </button>
    )
}

export default Room;