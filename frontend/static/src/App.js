import './App.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import Chat from './components/Chat';
import LoggedOut from './components/LoggedOut';

const App = () => {
  	const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
	console.log(Cookies.get('Authorization'));

	return (
		<>
		{auth ? <Chat setAuth={setAuth}/> : <LoggedOut setAuth={setAuth}/>}
		</>
  	);
}

export default App;
