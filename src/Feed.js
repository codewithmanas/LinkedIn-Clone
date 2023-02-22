import React, { useEffect, useState } from 'react';
import "./Feed.css";
import CreateIcon from '@mui/icons-material/Create';
import InputOption from './InputOption';
import ImageIcon from '@mui/icons-material/Image';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import Post from './Post';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';




function Feed() {

  const user = useSelector(selectUser)
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: serverTimestamp()
    })
    .then(() => setInput(""))
    .catch((error) => console.error("Error adding document: ", error));
  };


  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
            <CreateIcon />
            <form>
              <input value={input} onChange={e => setInput(e.target.value)} type="text" />
              <button onClick={sendPost} type="submit">Send</button>
            </form>
        </div>
        <div className="feed__inputOption">
          <InputOption Icon={ImageIcon} title="Photo" color="#7085F9"/>
          <InputOption Icon={SmartDisplayIcon} title="Video" color="#e7a33e"/>
          <InputOption Icon={EventIcon} title="Event" color="#C0CBCD"/>
          <InputOption Icon={ArticleIcon} title="Write article" color="#7fc15e"/>
        </div>
      </div>


      <FlipMove>
        {posts.map(({id, data: {name, description, message, photoUrl}}) => (
          <Post 
            key = {id}
            name = {name}
            description = {description}
            message = {message}
            photoUrl = {photoUrl}
          />
        ))}
      </FlipMove>
      
    </div>
  );
}

export default Feed;