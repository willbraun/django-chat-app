import { useState } from 'react';
import Cookies from 'js-cookie';
import { handleError } from './../helpers';

const Login = ({setAuth, setCreateAccount}) => {
    const [state, setState] = useState({
        username: '',
        password: '',
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

        const response = await fetch("/dj-rest-auth/login/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        setAuth(true);
    }
  
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input 
                    name="username" 
                    value={state.username} 
                    type="text" 
                    id="username" 
                    required 
                    onChange={handleInput}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                    name="password" 
                    value={state.password} 
                    type="password" 
                    id="password" 
                    required 
                    onChange={handleInput}/>
            </div>
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login;