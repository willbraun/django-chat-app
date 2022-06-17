import { useState } from 'react';
import CreateAccount from './CreateAccount';
import Login from './Login';

const LoggedOut = ({setAuth}) => {
  	const [newAccount, setNewAccount] = useState(false);
	


	return (
		<>
        {newAccount ? <CreateAccount setAuth={setAuth} setNewAccount={setNewAccount}/> : <Login setAuth={setAuth} setNewAccount={setNewAccount}/> }
        </>
  	);
}

export default LoggedOut;