import { useState } from 'react';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const CreateMessage = ({selectedRoom, addMessageToState}) => {
    const [state, setState] = useState({
        room: '',
        body: '',
    });

    const handleInput = (e) => {
        setState({...state, body: e.target.value});
    }

    const sendMessage = async (newMessage) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(newMessage),
        }

        const response = await fetch(`/api_v1/rooms/${newMessage.room}/messages/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        addMessageToState(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage({...state, room: selectedRoom.id});
        setState({...state, body: ''});
    }


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input 
                    name="body" 
                    value={state.body} 
                    type="text" 
                    id="body" 
                    placeholder="New message..."
                    required 
                    onChange={handleInput}
                />
                <button type="submit">Send</button>
            </form>
        </section>
    )
}

export default CreateMessage;