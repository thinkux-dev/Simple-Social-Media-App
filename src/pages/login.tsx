import React from 'react';
import { auth, provider} from '../config/firebase.ts';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from './login.module.css';

export const Login = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate('/')
  };

  const signUserOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return ( 
    <div className={styles.Login}> 
      <p> Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
      {user && (
        <button onClick={signUserOut} className={styles.signoutbtn}> Log Out</button>
      )}
    </div> 
  );
};