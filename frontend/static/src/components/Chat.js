import { handleError } from "../helpers";
import Cookies from "js-cookie";

const Chat = ({setAuth}) => {
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
	
	return (
		<>
        <div>I am the chat</div>
        <button type="button" onClick={logOut}>Log Out</button>
        </>
        
        
  	);
}

export default Chat;