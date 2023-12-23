import React from 'react';
import { CreateForm } from './create-form.tsx';

import Styles from './createform.module.css';

export const CreatePost = () => {
  return (
    <div className={Styles.createpost}>
      <CreateForm />
    </div>
  )
};