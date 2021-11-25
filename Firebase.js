import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyDalrUK535MAkzlIen2dYkxelUCPJPpSZ8",
    authDomain: "snapchat-clone-yt-2d03e.firebaseapp.com",
    projectId: "snapchat-clone-yt-2d03e",
    storageBucket: "snapchat-clone-yt-2d03e.appspot.com",
    messagingSenderId: "80039579146",
    appId: "1:80039579146:web:39324548198e10b89e59f3",
    measurementId: "G-73JNNQR77N"
  };
const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebase.firestore()
const auth=firebase.auth()
const storage=firebase.storage()
const provider=new firebase.auth.GoogleAuthProvider()
export {db,auth,storage,provider}