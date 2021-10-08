import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  Switch,
  Route,
} 
from "react-router-dom";
import Signup from './pages/signup/Signup';
import Feed from './pages/feed/Feed';
import Login from './pages/login/Login';
import UpdateUser from './pages/UpdateUser';
import CurrentChat from './components/CurrentChat';
import Messenger from './pages/messenger/Messenger';
import { AuthContext } from './context/auth.context';
import Profile from './pages/profile/Profile';
import Visit from './pages/visit/Visit';
import Error from './pages/error/Error';


function App() {


  const { user } = useContext(AuthContext)

  return (
    <div className="App">
     <Navbar user={user} />
    
    <Switch>
      <Route exact path='/visit/:userId' component={Visit} />
      <Route exact path='/messenger' component={Messenger} />
      <Route exact path='/chats/:chatId' component={CurrentChat} />
      <Route exact path='/edit' component={UpdateUser} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/feed' component={Feed} />
      {user ?  <Route path='/' component={Profile} /> : <Route path='/' component={Login} /> }
      <Route component={Error} />
      
    </Switch>
    </div>

  );
}

export default App;
