import { useState } from 'react';
import Cookies from "js-cookie";
import { handleError } from "../helpers";

const CreateAccount = ({setAuth, setNewAccount}) => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const handleInput = (event) => {
        const {name, value} = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch("/dj-rest-auth/registration/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        setAuth(true);
    }
  
    return (
        <main>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label> 
                <input 
                    name="username" 
                    value={state.username} 
                    type="text" 
                    id="username" 
                    required 
                    onChange={handleInput}
                />
                <label htmlFor="email">Email</label> 
                <input 
                    name="email" 
                    value={state.email} 
                    type="text" 
                    id="email" 
                    required 
                    onChange={handleInput}
                />
                <label htmlFor="password1">Password1</label> 
                <input 
                    name="password1" 
                    value={state.password1} 
                    type="password" 
                    id="password1" 
                    required 
                    onChange={handleInput}
                />
                <label htmlFor="password2">Password2</label> 
                <input 
                    name="password2" 
                    value={state.password2} 
                    type="password" 
                    id="password2" 
                    required 
                    onChange={handleInput}
                />
                <button type="button" onClick={() => setNewAccount(false)}>Back to Log In</button>
                <button type="submit">Create Account</button>
            </form>
        </main>
        
        
      );
  }
  
  export default CreateAccount;