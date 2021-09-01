import React, { useEffect, useState } from 'react' //eslint-disable-line
import { Switch, Link, Route, useHistory } from 'react-router-dom' //eslint-disable-line
import styled from 'styled-components' //eslint-disable-line
import axios from 'axios' //eslint-disable-line
import Login from "./components/Login.js"
import TeamBuilder from "./components/TeamBuilder.js"
import Vote from "./components/Vote.js"


function App() {
  const history = useHistory()

  function logout(){
    localStorage.removeItem('token');
    history.push('/')
  }

  return (
    <div className="App">
      <Switch>
        <Route path ='/teamBuilder'>
          <TeamBuilder logout={logout}/>
        </Route>
        <Route path ='/rank-teams'>
          <Vote logout={logout}/>
        </Route>
        <Route path='/'>
          <Login/>
        </Route>
      </Switch>

    </div>
  );
}

export default App;
