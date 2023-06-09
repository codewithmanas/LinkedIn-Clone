// import linkedinLogo from "./linkedinLogo.png";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();
    
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            const user = userCredential.user;
            dispatch(login({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              photoUrl: user.photoUrl,
            }));
          })
          .catch(error => alert(error));
      };

    const register = () => {
        const auth = getAuth();
        if(!name){
            return alert("Please enter a Full name!");
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                dispatch(
                    login({
                        email: user.email,
                        uid: user.uid,
                        displayName: name,
                        photoURL: profilePic,
                    })
                );
            })
        }).catch(error => alert(error));
    };


  return (
    <div className="login">

        <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg" alt="login__logo" />

        <form>
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Full name {required if registering}" />
            <input value={profilePic} onChange={e =>setProfilePic(e.target.value)} type="text" placeholder="Profile pic URL (optional)" />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />

            <button type="submit" onClick={loginToApp}>Sign In</button>
        </form>

        <p>Not a member?{" "}<span className="login__register" onClick={register}>Register Now</span></p>
    </div>
  );
}

export default Login;