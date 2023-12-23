import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.ts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import styles from './navbar.module.css';

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const signUserOut = async () => {
    await signOut(auth);
    navigate('/login')
  };

  return (
    <div className={styles.Nav}>

      <div className={styles.Links}>
        {user && (
          <Link to='/'> Home </Link>
        )}

        {!user ? (
          <Link to='/login'> Login </Link>
        ) : (
          <Link to='/createpost'> Create Post </Link>
        )}
      </div>

      <div className={styles.user}>
        {user && (
          <>
            <p> {user?.displayName} </p>
            <img src={auth.currentUser?.photoURL || ''} width='30' height='30' />
            <button onClick={signUserOut} className={styles.signoutbtn}> Log Out</button>
          </>
        )}
      </div>
    </div>
  )
};