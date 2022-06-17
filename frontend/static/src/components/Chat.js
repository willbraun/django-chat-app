import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';
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
        messages: [],
    })
    
    const logOut = async (event) => {
        event.preventDefault();
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

        const data = await response.json()
        data.forEach(item => item.reactKey = uuidv4());
        console.log(data);
        setState({...state, rooms: data});
    }

    // write get messages function

    useEffect(() => {
		getRooms();
    }, [])

    // const roomList = state.rooms.map(room => <Room key={room.reactKey} {...room}/>)
    const staticRoomList = staticRooms.map(room => <Room key={room.reactKey} {...room}/>)

    const sidebar = (
        <aside>
            {staticRoomList}
            <AddRoomForm/>
        </aside>
    )

    const main = (
        <main>
            <Message/>
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