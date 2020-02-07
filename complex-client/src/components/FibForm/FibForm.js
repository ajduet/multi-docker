import React, { useState } from 'react';
import classes from './FibForm.module.css';

function FibForm({ submitValue }) {
  const [value, setValue] = useState(0);

  const changeHandler = e => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    submitValue({ value });
    setValue(0);
  };

  return (
    <React.Fragment>
      <form noValidate onSubmit={submitHandler}>
        <input
          className={classes.numberField}
          type='number'
          min='0'
          max='40'
          value={value}
          onChange={changeHandler}
        />
        <button
          className={classes.primaryButton}
          type='submit'
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default FibForm;
