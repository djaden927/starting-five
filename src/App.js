import React, { useEffect, useState } from 'react' //eslint-disable-line
import { Switch, Link, Route, useHistory } from 'react-router-dom' //eslint-disable-line
import styled from 'styled-components' //eslint-disable-line
import axios from 'axios' //eslint-disable-line
import Login from "./components/Login.js"


function App() {
  return (
    <div className="App">
      <h1>Home page</h1>

      <Switch>
        <Route path='/'>
          <Login/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
