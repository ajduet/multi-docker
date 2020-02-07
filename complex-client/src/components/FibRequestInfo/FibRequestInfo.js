import React from 'react';
import classes from './FibRequestInfo.module.css';

function FibRequestInfo({ values }) {
  return (
    <div className={classes.infoContainer}>
      <p className={classes.infoContainerHeader}>Fibs calculated</p>
      <div>
        {values.map((elem, index) => (
          <span key={index} className={classes.infoEntry}>
            {elem.number}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export default FibRequestInfo;
