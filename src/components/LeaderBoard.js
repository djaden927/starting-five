
import React, {useEffect} from "react"
// import styled from "styled-components"
import '../../src/team.css';
// import { useHistory } from 'react-router-dom';
import axiosWithAuth from "../axiosAuth";


export default function LeaderBoard(){


        useEffect(() => {
            axiosWithAuth()
                .get('/leaderboard')
                .then(res => {
                    console.log("leaderboard page")
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])

    return (
        <div>
            <h1>leaderboard</h1>
        </div>
    )
}