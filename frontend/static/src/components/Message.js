import { useState } from 'react';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';

const Message = ({id, author, room, body, created_timestamp_UTC, editMessageOnState}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [state, setState] = useState ({
        id,
        room,
        body,
    })

    const handleInput = (e) => {
        setState({...state, body: e.target.value});
    }

    const updateMessage = async (editedMessage) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(editedMessage),
        }

        const response = await fetch(`/api_v1/rooms/${editedMessage.room}/messages/${id}`, options).catch(handleError);

        if(!response.ok) {
            throw new Error('Network response was not ok!');
        }

        editMessageOnState(editedMessage);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMessage(state);
        setIsEditing(false);
    }

    const previewHTML = (
        <article>
            <h3>{author}</h3>
            <time>{created_timestamp_UTC}</time>
            <p>{body}</p>
            <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
            <button type="button">Delete</button>
        </article>
    )

    const editHTML = (
        <article>
            <h3>{author}</h3>
            <time>{created_timestamp_UTC}</time>
            
            <form onSubmit={handleSubmit}>
                <input 
                    name="body" 
                    value={state.body} 
                    type="text" 
                    id="body" 
                    placeholder="Edit message..."
                    required 
                    onChange={handleInput}
                />
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit">Save</button>
            </form>
            
        </article>
    )

    return (
        <>
        {isEditing ? editHTML : previewHTML}
        </>
    )
}

export default Message;