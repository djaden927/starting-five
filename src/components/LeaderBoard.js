
import React, {useEffect, useState} from "react"
import styled from "styled-components"
import '../../src/team.css';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from "../axiosAuth";

const StartGame = styled.button`
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #ee6730;
    padding: 20px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    transition: all 0.4s ease 0s;
    // width: 37%;
    margin: 1%;

    &:hover{
        background: #434343;
	    letter-spacing: 1px;
	    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
	    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
	    transition: all 0.4s ease 0s;
    }
`

const Pick = styled.button`
    height: auto;
    margin: .5% auto;
    width: 80%;
    line-height: 40px;
    font-size: 18px;
    font-family: sans-serif;
    text-decoration: none;
    color: #333;
    border: 2px solid #333;
    letter-spacing: 2px;
    text-align: center;
    position: relative;
    position: relative;
    z-index: 2;
`

const MainTeamBuilderBox = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 90%;
    width: 90%;
`

const MyTeam = styled.div`
    border: 4px solid #051094;
    width: 20%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1%;
`

const StartingFiveTitle = styled.h2`
    text-align: center;
    width: 50%;
    background-color: #ee6730;
    text-transform: uppercase;
`


export default function LeaderBoard(props){
    const {logout} = props
    const [best3, setBest3] = useState([])
    const history = useHistory()


        useEffect(() => {
            axiosWithAuth()
                .get('/leaderboard')
                .then(res => {
                    console.log("leaderboard page")
                    console.log(res.data)
                    setBest3(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, [])

        const buildTeam = (evt) => {
            evt.preventDefault()
            history.push('/teamBuilder')
        }

        const rankTeamsWithoutSubmit = (evt) => {
            evt.preventDefault()
            history.push('/rank-teams')
        }

    return (
        <div className="teamBuilder">
            <header>
                <StartGame className="headerButton" onClick={buildTeam}>Build a new team</StartGame>
                <StartGame className="headerButton" onClick={rankTeamsWithoutSubmit}>Rank teams</StartGame>
                <StartGame className="headerButton" onClick={logout}>Logout</StartGame>
            </header>

            <MainTeamBuilderBox >
                {best3.map((team, idx) => {
                    return (

                        <MyTeam key={team.team_id}>
                            <StartingFiveTitle>GM: {team.username} | Wins: {team.wins} | Losses: {team.losses} | Win%: {team.win_percentage * 100}</StartingFiveTitle>
                            <Pick>{team.PG}</Pick>
                            <Pick>{team.SG}</Pick>
                            <Pick>{team.SF}</Pick>
                            <Pick>{team.PF}</Pick>
                            <Pick>{team.C}</Pick>
                            <StartingFiveTitle>#{idx +1} team</StartingFiveTitle>
                        </MyTeam>
                    )
                })}
            </MainTeamBuilderBox>

            

        </div>
    )
}