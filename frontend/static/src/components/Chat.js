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

    const getRooms = async (id = null) => {
        const response = await fetch('/api_v1/rooms/').catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        
        const data = await response.json();
        const index = id ? data.findIndex(room => room.id === id) : 0;
        const selection = data[index];
        const messages = await getMessages(selection.id);
        setState({rooms: data, selectedRoom: selection, messages: messages});
    }

    const getMessages = async (id) => {
        const response = await fetch(`/api_v1/rooms/${id}/messages/`).catch(handleError);
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        return data;
    }

    useEffect(() => {
        getRooms();
        
        console.log(state.selectedRoom.id); // why is this the same every time even if I switch views
        // const interval = setInterval(() => getRooms(state.selectedRoom.id), 3000);
        // return () => clearInterval(interval);
    }, [])


    if (!state.rooms) {
        return <div>Loading rooms...</div>
    }

    if (!state.messages) {
        return <div>Loading messages...</div>
    }

    const selectRoom = async (id) => {
        const newList = state.rooms;
        const index = newList.findIndex(room => room.id === id);
        const selection = newList[index]
        const messages = await getMessages(id);
        setState({...state, selectedRoom: selection, messages: messages})
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
	
	return (
        <>
            <header className="chat-header">
                <h1>GVL Chat</h1>
                <button type="button" class="logout-button" onClick={logOut}>Log Out</button>
            </header>
            <aside className="sidebar">
                <h2 className="rooms-subheader">Rooms</h2>
                <section className="rooms-display">
                    {roomList}
                </section>
                <AddRoomForm addRoomToState={addRoomToState}/>
            </aside>
            <main className="room-detail">
                <div className="selected-room-name">
                    {state.selectedRoom.name}
                </div>
                <section className="messages-display">
                    {messageList}
                </section> 
                <CreateMessage selectedRoom={state.selectedRoom} addMessageToState={addMessageToState}/>
            </main>
        </>
  	);
}

export default Chat;