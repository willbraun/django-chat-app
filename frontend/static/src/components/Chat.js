import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import './../styles/chat.css';
import { handleError } from "../helpers";
import Room from "./Room";
import AddRoomForm from "./AddRoomForm";
import Message from "./Message";
import CreateMessage from "./CreateMessage";


const Chat = ({setAuth}) => {
    const [state, setState] = useState({
        rooms: [],
        selectedRoom: {},
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
        const selection = data[0];
        const messages = await getMessages(selection.id);
        setState({rooms: data, selectedRoom: selection, messages: messages});
    }

    useEffect(() => {
		getRooms();
    }, [])

    if (!state.rooms) {
        return <div>Loading rooms...</div>
    }

    const getMessages = async (id) => {
        const response = await fetch(`/api_v1/rooms/${id}/messages/`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        return data;
    }

    if (!state.messages) {
        return <div>Loading messages...</div>
    }

    const selectRoom = async (id) => {
        const newList = state.rooms;
        const index = newList.findIndex(room => room.id === id);
        const messages = await getMessages(id);
        setState({...state, selectedRoom: newList[index], messages: messages})
    }

    const addRoomToState = (newRoom) => {
        const newList = state.rooms;
        newList.push(newRoom);
        setState({...state, rooms: newList});
    }

    const addMessageToState = (newMessage) => {
        const newList = state.messages;
        newList.push(newMessage);
        setState({...state, messages: newList});
    }

    const editMessageOnState = (editedMessage) => {
        const newList = state.messages;
        const index = newList.findIndex(message => message.id === editedMessage.id);
        newList[index] = {...newList[index], body: editedMessage.body};
        setState({...state, messages: newList});
    }

    const deleteMessageFromState = (id) => {
        const newList = state.messages;
        const index = newList.findIndex(message => message.id === id);
        newList.splice(index, 1);
        setState({...state, messages: newList});
    }

    const roomList = state.rooms.map(room => <Room key={room.id} {...room} selectRoom={selectRoom}/>);
    const messageList = state.messages.map(message => <Message key={message.id} {...message} editMessageOnState={editMessageOnState} deleteMessageFromState={deleteMessageFromState}/>);

    const sidebar = (
        <aside className="sidebar">
            {roomList}
            <AddRoomForm addRoomToState={addRoomToState}/>
        </aside>
    )

    const main = (
        <main className="room-detail">
            {messageList}
            <CreateMessage selectedRoom={state.selectedRoom} addMessageToState={addMessageToState}/>
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