import React, { useEffect, useState } from 'react';

function FibList({ values }) {
  const [state, setState] = useState([]);
  useEffect(() => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <li key={key}>
          For index {key} I calculated {values[key]}
        </li>
      );
      setState(entries);
    }
  }, [values]);
  return (
    <React.Fragment>
      <p>I have calculated</p>
      <ul>{state.map(entry => entry)}</ul>
    </React.Fragment>
  );
}

export default FibList;
