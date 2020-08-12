import React from 'react';
import {Route,Switch} from 'react-router'
import {Join} from './components/Join'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Signup} from './components/Signup/Signup';
import {Login} from './components/Login/Login'
import Chat from './components/Chat/Chat'
import {PrivateChat} from'./components/Chat/PrivateChat'

function App() {
  return (
    
    <Switch>
      <Route path="/" exact  render={(props) => <Join {...props}/>} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
      <Route path="/priv" component={PrivateChat} />
    </Switch>
   
  );
}

export default App;
