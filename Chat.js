import React from 'react'
import "./chat.css"
import { Avatar } from '@material-ui/core'
import  StopRoundedIcon from '@material-ui/icons/StopRounded'
import ReactTimeago from 'react-timeago'
import { selectImage } from './features/appSlice'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import {db} from "./Firebase"
function Chat({id,imageUrl,username,timestamp,read,profilepic}) {
    const dispatch=useDispatch()
    const history=useHistory()
    const open=()=>{
        if(!read){
            dispatch(selectImage(imageUrl));
            db.collection("posts").doc(id).set({
                read:true,
            },
            {merge:true}
            );
            history.push("/chat/view")
        }
    };
    
    return (
        <div onClick={open} className="chat">
            <Avatar className="chat__avatar" src={profilepic}/>
            <div className="chat__info">
               <h4>{username}</h4>
               <p>Tap to view-<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>
            {!read && <StopRoundedIcon className="chat__readyIcon"/>}
        </div>
    )
}

export default Chat
