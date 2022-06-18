import { useState } from "react";
import Cookies from "js-cookie";
import { handleError } from "../helpers";
import './../styles/addroomform.css';

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
        <section className="add-room-section">
            <h2>Create New Room</h2>
            <form class="add-room-form" onSubmit={handleSubmit}>
                <label htmlFor="room-name"></label> 
                    <input 
                        name="room-name" 
                        value={state.name}
                        type="text" 
                        id="room-name" 
                        placeholder="Enter room name..."
                        required 
                        onChange={handleInput}
                    />
                <button>+ New Room</button>
            </form>
        </section>
        
    )
}

export default AddRoomForm;