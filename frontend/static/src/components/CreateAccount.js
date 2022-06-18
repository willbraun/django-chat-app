import { useState } from 'react';
import Cookies from "js-cookie";
import { handleError } from "../helpers";
import './../styles/createaccount.css';

const CreateAccount = ({setAuth, setNewAccount}) => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="auth-background">
            <main className="create-account-box">
                <h1>GVL Chat</h1>
                <h2>Create Account</h2>
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
                    <label htmlFor="password1">Password</label> 
                    <input 
                        name="password1" 
                        value={state.password1} 
                        type="password" 
                        id="password1" 
                        required 
                        onChange={handleInput}
                    />
                    <label htmlFor="password2">Confirm Password</label> 
                    <input 
                        name="password2" 
                        value={state.password2} 
                        type="password" 
                        id="password2" 
                        required 
                        onChange={handleInput}
                    />
                    <button type="submit" className="create-account-button">Create Account</button>
                    <button type="button" className="back-to-login" onClick={() => setNewAccount(false)}>Back to Log In</button>
                </form>
            </main>
        </div>
      );
  }
  
  export default CreateAccount;