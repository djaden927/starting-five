import axios from 'axios';
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const initialValues = {
    username: "",
    password: ""
}

export default function Login (props) {
    const [values, setValues] = useState(initialValues)

    const onSubmit = evt => {
        evt.preventDefault()

    }

    const onChange = evt => {
        setValues({...values, [evt.target.name]: evt.target.value})
    }

    return(
       

        <div> 
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
            <label>Username 
                    <input
                        value={values.username}
                        onChange={onChange}
                        name='username'
                        type='text'
                        placeholder='kevinhookemhorns'
                        />
                </label>
                <label> Password 
                    <input 
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='password'
                    />
                </label>

                <button className="submitButton">Login</button>
                
            </form>
        </div>
        
    )
}