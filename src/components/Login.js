import axios from 'axios'; //eslint-disable-line
import React, { useState } from 'react';

import styled from 'styled-components'; //eslint-disable-line
import { useHistory } from 'react-router-dom'; //eslint-disable-line

const initialValues = {
    username: "",
    password: ""
}



export default function Login (props) {
    const [values, setValues] = useState(initialValues)
    const history = useHistory();

    const onSubmit = evt => {
        evt.preventDefault()
        axios.post('https://starting5.herokuapp.com/api/auth/login', {username: values.username, password: values.password})
            .then(res => {
                localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user_id', res.data.user_id)
                    history.push('/teamBuilder')
            })
    }

    const onChange = evt => {
        setValues({...values, [evt.target.name]: evt.target.value})
    }

    const register = evt => {
        evt.preventDefault()
        axios.post('https://starting5.herokuapp.com/api/auth/register', {username: values.username, password: values.password})
            .then(res => {
                setValues(initialValues)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
       

        <div> 
            <h1>Login</h1>
            <form>
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

                <button onClick={onSubmit} className="submitButton">Login</button>
                <button onClick={register}>Create an account</button>
                
            </form>
        </div>
        
    )
}