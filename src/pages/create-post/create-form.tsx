import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthState } from 'react-firebase-hooks/auth';
import Styles from './createform.module.css';
import { useNavigate } from 'react-router-dom'; /* For redirect after submission or completion of action */

import { addDoc, collection } from 'firebase/firestore'; /* Help to communicate with your database */
import { auth, db } from '../../config/firebase.ts';

interface CreateFormData {
  title: string;
  description: string;
}

export const CreateForm = () => {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('You must add a title.'),
    description: yup.string().required('You must add a description.'),
  });

  const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
  });

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data: CreateFormData) => {
    try {
      await addDoc(postsRef, {
        ...data,
        username: user?.displayName,
        userId: user?.uid,
      });

      navigate('/');
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder='Title...' {...register('title')} />
      <p style={{ color: 'red' }}>{errors.title?.message}</p>
      <textarea placeholder='Description...' {...register('description')} />
      <p style={{ color: 'red' }}>{errors.description?.message}</p>
      <input type='submit' className={Styles.submitForm} />
    </form>
  );
};