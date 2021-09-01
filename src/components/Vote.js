
import React, {useEffect, useState} from "react"
import styled from "styled-components"
import '../../src/team.css';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from "../axiosAuth";

//This page handles generating 5 random teams, adding those players to your team and then submitting the team to the database.
//Need to restrict adding positions that are already on the team.
//need to be able to submit the team once all 5 positions are filled. 


const MainTeamBuilderBox = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 90%;

    @media(max-width: 450px) {
        max-width:100%;
    }
`

const MyTeam = styled.div`
border: 4px solid #051094;
width: 70%;
display: flex;
flex-wrap: wrap;
justify-content: center;
margin: 1%;

@media(max-width: 450px) {
    border: 3px solid #051094;
    width:90%;
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
    @media(max-width: 450px) {
        width:95%;
        letter-spacing: 1px;
        border: 1px solid #333;
    }
`

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

    @media(max-width: 450px) {
        width:30%;
    }
`

const StartingFiveTitle = styled.h2`
    text-align: center;
    width: 30%;
    background-color: #ee6730;
    text-transform: uppercase;

    @media(max-width: 450px) {
        width:75%;
    }
`

const initialTwoTeams = []

export default function Vote(props){

    const{logout} = props

    const history = useHistory();
    const [twoTeams, setTwoTeams] = useState(initialTwoTeams)
    const [teamIds, setTeamIds] = useState([])
    const [team1Wins, setTeam1Wins] = useState(0)
    const [team2Wins, setTeam2Wins] = useState(0)
    const [team1Losses, setTeam1Losses] = useState(0)
    const [team2Losses, setTeam2Losses] = useState(0)

    useEffect(() =>{
        axiosWithAuth()
        .get('/vote')
        .then(res => {
            setTwoTeams(res.data)
            setTeamIds([res.data[0][0].team_id, res.data[1][0].team_id])
            setTeam1Wins(res.data[0][0].wins)
            setTeam2Wins(res.data[1][0].wins)
            setTeam1Losses(res.data[0][0].losses)
            setTeam2Losses(res.data[1][0].losses)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    const buildTeam = (evt) => {
        evt.preventDefault()
        setTwoTeams(initialTwoTeams)
        history.push('/teamBuilder')
    }

    const voteForTeam = (evt) => {
        evt.preventDefault()
        let team1WinPercentage = 0
        let team2WinPercentage = 0
        let winningTeam = 0
        let losingTeam = 0
        if(evt.target.value === teamIds[0]){
            team1WinPercentage = (team1Wins + 1) / (team1Wins + team1Losses + 1)
            team2WinPercentage = (team2Wins) / (team2Wins + team2Losses + 1) 
            winningTeam = teamIds[0]
            losingTeam = teamIds[1]
        }else{
            team1WinPercentage = (team1Wins) / (team1Wins + team1Losses + 1)
            team2WinPercentage = (team2Wins + 1) / (team2Wins + team2Losses + 1) 
            winningTeam = teamIds[1]
            losingTeam = teamIds[0]
        }
        axiosWithAuth()
        .put('/vote', {
            winningTeam: winningTeam,
            losingTeam: losingTeam,
            team1WinPercentage: team1WinPercentage,
            team2WinPercentage: team2WinPercentage,
            team1: teamIds[0],
            team2: teamIds[1]
        })
        .then(res => {
            console.log("made it here")
        })
        .catch(err => {
            console.log(err)
        })

        axiosWithAuth()
        .get('/vote')
        .then(res => {
            setTwoTeams(res.data)
            setTeamIds([res.data[0][0].team_id, res.data[1][0].team_id])
            setTeam1Wins(res.data[0][0].wins)
            setTeam2Wins(res.data[1][0].wins)
            setTeam1Losses(res.data[0][0].losses)
            setTeam2Losses(res.data[1][0].losses)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const leaderBoard = (evt) => {
        evt.preventDefault()
        history.push('/leaderboard')
    }

    return(

        <div className="teamBuilder">
            <header>
                <StartGame className="headerButton" onClick={buildTeam}>Build a new team</StartGame>
                <StartGame className="headerButton" onClick={leaderBoard}>View Leaderboard</StartGame>
                <StartGame className="headerButton" onClick={logout}>Logout</StartGame>
            </header>
            {twoTeams.length > 0 ? 
            <MainTeamBuilderBox>
                <MyTeam className="teamPicker" value={twoTeams[0][0].team_id} onClick={voteForTeam}>
                    <StartingFiveTitle>Team One</StartingFiveTitle>
                    <Pick>{twoTeams[0][0].PG}</Pick>
                    <Pick>{twoTeams[0][0].SG}</Pick>
                    <Pick>{twoTeams[0][0].SF}</Pick>
                    <Pick>{twoTeams[0][0].PF}</Pick>
                    <Pick>{twoTeams[0][0].C}</Pick>
                </MyTeam>

                <MyTeam className="teamPicker" value={twoTeams[1][0].team_id} onClick={voteForTeam}>
                    <StartingFiveTitle>Team Two</StartingFiveTitle>
                    <Pick>{twoTeams[1][0].PG}</Pick>
                    <Pick>{twoTeams[1][0].SG}</Pick>
                    <Pick>{twoTeams[1][0].SF}</Pick>
                    <Pick>{twoTeams[1][0].PF}</Pick>
                    <Pick>{twoTeams[1][0].C}</Pick>
                </MyTeam>
            </MainTeamBuilderBox> : null}

            {/* <h1>{teamIds[0]} {teamIds[1]}</h1> */}
        </div>
    )
}