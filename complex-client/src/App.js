import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
