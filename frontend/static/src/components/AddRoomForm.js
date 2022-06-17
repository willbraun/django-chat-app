import { useState } from "react";
import Cookies from "js-cookie";
import { handleError } from "../helpers";

const AddRoomForm = ({addRoomToState}) => {
    const blank = { name: '', };
    
    const [state, setState] = useState(blank)

    const handleInput = (e) => {
        setState({...state, name: e.target.value})
    }

    const addRoom = async (newRoom) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newRoom),
        }

        const response = await fetch("/api_v1/rooms/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        addRoomToState(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        addRoom(state);
        setState(blank);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="room-name">Room Name</label> 
                <input 
                    name="room-name" 
                    value={state.name}
                    type="text" 
                    id="room-name" 
                    required 
                    onChange={handleInput}
                />
            <button>+ Add Room</button>
        </form>
    )
}

export default AddRoomForm;