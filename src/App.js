import React, { useEffect, useState } from 'react'
import { Switch, Link, Route, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
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
