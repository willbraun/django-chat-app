const Room = ({id, name, selectRoom}) => {

    return (
        <button className="room" type="button" onClick={() => selectRoom(id)}>
            <h2>{name}</h2>
        </button>
    )
}

export default Room;