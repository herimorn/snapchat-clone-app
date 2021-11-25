import React,{useEffect, useState}from 'react'
import { Avatar } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import {db,auth} from "./Firebase"
import "./Chats.css"
import Chat from "./Chat"
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from './features/appSlice'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import { useHistory } from 'react-router'
import { resetCameraImage } from './features/cameraSlice'
function Chats() {
    const[posts,setPosts]=useState([])
    const user=useSelector(selectUser)
    const dispatch=useDispatch()
    const history=useHistory()
    useEffect(()=>{
        db.collection("posts").orderBy("timestamp","desc").onSnapshot((snapshot)=>setPosts(
            snapshot.docs.map((doc)=>(
                {
                    id:doc.id,
                    data:doc.data()
                }
            ))
        ))
    },[])
    const takesnap=()=>{
        dispatch(resetCameraImage)
        history.push("/")
    }
    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilepic} onClick={()=>auth.signOut()}className="chats__avatar"/>
                <div className="chats__search"> 
                    <SearchIcon/>
                    <input type="text" placeholder="Friends"/>
                
                </div>
                <ChatBubbleIcon/>
            </div>
            <div className="chat__post">
              {posts.map(({id,data:{imageUrl,username,timestamp,profilepic,read}})=>(
                  <Chat key={id} id={id} imageUrl={imageUrl} username={username} profilepic={profilepic} timestamp={timestamp}/>
              ))}
            </div>
            <RadioButtonCheckedIcon className="chat__takePicIcon" onClick={takesnap} fontSize="large"/>
        </div>
    )
}

export default Chats