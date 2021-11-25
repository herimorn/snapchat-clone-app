
import './App.css';
import WebcamCapture from './WebcamCapture';
import {BrowserRouter as Router,Switch, Route,Link} from "react-router-dom";
import ChatView from "./ChatView"
import Preview from './Preview';
import Chats from "./Chats"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './Firebase';
function App() {
  const user=useSelector(selectUser);
  const dispatch=useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          username:authUser.displayName,
          profilepic:authUser.photoURL,
          id:authUser.uid,
        }))
      }else{
        dispatch(logout())
      }
    })

  },[])
  return (
    <div className="app">
      <Router>
        {!user ?(
          <Login/>
        ):(
          <>
          <div className="app__body">
            
          <Switch>
          <Route exact path="/preview">
            <Preview/>
            </Route>
            <Route path="/chat/view">
            <ChatView/>
            </Route>
            <Route path="/chats">
            <Chats/>
            </Route>
            <Route exact path="/">
            <WebcamCapture/>
            </Route>
          </Switch>

        </div>
        </>
        )}
        
      </Router>
      
    </div>
  );
}

export default App;
