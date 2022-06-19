import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { handleError, scrollToBottomMessage } from '../helpers';
import './../styles/message.css';
import { format } from 'date-fns';
import editIcon from './../images/pen-to-square-solid.svg';
import deleteIcon from './../images/trash-solid.svg';

const Message = ({id, author, room, body, created_timestamp_UTC, editMessageOnState, deleteMessageFromState}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [state, setState] = useState ({
        id,
        room,
        body,
    })

    useEffect(() => {
        scrollToBottomMessage();
    },[])

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

        const response = await fetch(`/api_v1/rooms/${room}/messages/${id}/`, options).catch(handleError);

        if(!response.ok) {
            throw new Error('Network response was not ok!');
        }

        editMessageOnState(editedMessage);
    }

    const deleteMessage = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch(`/api_v1/rooms/${room}/messages/${id}/`, options).catch(handleError);

        if(!response.ok) {
            throw new Error('Network response was not ok!');
        }

        deleteMessageFromState(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMessage(state);
        setIsEditing(false);
    }

    const formatDate = (date) => {
        const thisDate = new Date(date);
        return format(thisDate, 'h:mm a, M/d/yyyy');
    }

    const formattedTimestamp = formatDate(created_timestamp_UTC);

    const previewHTML = (
        <article className="message">
            <div className="top-row">
                <h3>{author}</h3>
                <time>{formattedTimestamp}</time>
                <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>
                    <img src={editIcon} alt="pencil icon" />
                </button>
                <button type="button" className="delete-button" onClick={() => deleteMessage()}>
                    <img src={deleteIcon} alt="trash icon" />
                </button>
            </div>
            <p>{body}</p>
        </article>
    )

    const editHTML = (
        <article className="message">
            <div className="top-row">
                <h3>{author}</h3>
                <time>{formattedTimestamp}</time>
                <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="save-button" >Save</button>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea 
                    name="body" 
                    value={state.body} 
                    type="text" 
                    id="body" 
                    placeholder="Edit message..."
                    required 
                    onChange={handleInput}
                ></textarea>
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