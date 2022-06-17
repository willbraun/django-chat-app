import { useState } from 'react';
import Cookies from 'js-cookie';
import Chat from './components/Chat';
import LoggedOut from './components/LoggedOut';

const App = () => {
  	let [auth, setAuth] = useState(!!Cookies.get('Authorization'));

	// testing. change above to const at end
	auth = true;
	// testing.

	return (
		<>
		{auth ? <Chat setAuth={setAuth}/> : <LoggedOut setAuth={setAuth}/>}
		</>
  	);
}

export default App;
