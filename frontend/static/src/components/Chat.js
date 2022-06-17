import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import './../styles/chat.css';
import { handleError } from "../helpers";
import Room from "./Room";
import AddRoomForm from "./AddRoomForm";
import Message from "./Message";
import CreateMessage from "./CreateMessage";
import { staticRooms, staticMessages } from '../staticdata';


const Chat = ({setAuth}) => {
    const [state, setState] = useState({
        rooms: [],
        selectedRoomIndex: 0,
        messages: [],
    })
    
    const logOut = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        Cookies.remove("Authorization");
        setAuth(false);
    }

    const header = (
        <header className="chat-header">
            <h1>GVL Chat</h1>
            <button type="button" onClick={logOut}>Log Out</button>
        </header>
    )

    const getRooms = async () => {
        const response = await fetch('/api_v1/rooms/').catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setState({...state, rooms: data});
    }

    const getMessages = async (id) => {
        const response = await fetch(`/api_v1/rooms/${id}/messages/`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setState({...state, messages: data});
    }

    useEffect(() => {
		getRooms();
        getMessages(1);
    }, [])

    if (!state.rooms || !state.messages) {
        return <div>Loading...</div>
    }

    const addRoomToState = (newRoom) => {
        const newList = state.rooms;
        newList.push(newRoom);
        setState({...state, rooms: newList});
    }

    // function to select room by id, change Rooms to buttons and fire

    const roomList = state.rooms.map(room => <Room key={room.id} {...room}/>);
    // const staticRoomList = staticRooms.map(room => <Room key={room.reactKey} {...room}/>);

    const messageList = state.messages.map(message => <Message key={message.id} {...message}/>);

    const sidebar = (
        <aside className="sidebar">
            {roomList}
            <AddRoomForm addRoomToState={addRoomToState}/>
        </aside>
    )

    const main = (
        <main className="room-detail">
            {messageList}
            <CreateMessage/>
        </main>
    )
	
	return (
        <>
            {header}
            {sidebar}
            {main}
        </>
  	);
}

export default Chat;