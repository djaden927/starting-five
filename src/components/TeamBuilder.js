import {data} from "../data/lineupdata"
import React, {useState, useEffect} from "react"
import styled from "styled-components"
import '../../src/team.css';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from "../axiosAuth";

//This page handles generating 5 random teams, adding those players to your team and then submitting the team to the database.
//Need to restrict adding positions that are already on the team.
//need to be able to submit the team once all 5 positions are filled. 

const initialStartingFive = {
    PG: "",
    SG: "",
    SF: "",
    PF: "",
    C: ""
}

const initialAvailablePositions = {
    PG: false,
    SG: false,
    SF: false,
    PF: false,
    C: false
}

const MainTeamBuilderBox = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 90%;

    @media(max-width: 450px) {
        max-width: 100%;
    }
`

const TeamSelector = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    border: 4px solid #051094;
    margin: 1%;

    @media(max-width: 450px) {
        border: 3px solid #051094;
        margin: 0.5%;
        width:50%;
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
        margin: 0.5%;
        width:50%;
    }
`

const MyCompleteTeam = styled.div`
    border: 4px solid #051094;
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1%;

    @media(max-width: 450px) {
        border: 3px solid #051094;
        margin: 0.5%;
        width:80%;
        margin: 1% auto;
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
        width: 95%;
        letter-spacing: 1px;
        font-size: 16px;
    }
`

const HeaderButtons = styled.button`
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
	    transition: all 0.3s ease 0s;
    }

    @media(max-width: 450px) {
        width:30%;
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
	    transition: all 0.3s ease 0s;
    }

    @media(max-width: 450px) {
        width:47%;
    }
`

const StartingFiveTitle = styled.h2`
    text-align: center;
    width: 30%;
    background-color: #ee6730;
    text-transform: uppercase;

    @media(max-width: 450px) {
        width:95%;
        font-size: 20px;
    }
`
const Positions = styled.button`
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
        width: 95%;
        letter-spacing: 1px;
        font-size: 16px;
    }
`

let count = 0
export default function TeamBuilder(props){

    const{logout} = props

    const [fiveTeams, setFiveTeams] = useState([])
    const [myStartingFive, setMyStartingFive] = useState(initialStartingFive)
    const [teamComplete, setTeamComplete] = useState("incomplete")
    const [availablePositions, setAvailablePositions] = useState(initialAvailablePositions)
    const history = useHistory();

    useEffect(() => {
        count = 0
        newTeam()
    }, [])

    const newTeam = () => {
        setTeamComplete('incomplete')
        if(count === 5){
            setMyStartingFive(initialStartingFive)
            setAvailablePositions(initialAvailablePositions)
            count = 0
        }
        let randomTeamList = []
        for(let i = 0; i < 5; i++){
            randomTeamList.push(data[Math.floor(Math.random() * 30)])
        }
        setFiveTeams(randomTeamList)
    }

    const additionalTeam = () => {
        if(myStartingFive.PG === ""){
            newTeam()
            return
        }
        axiosWithAuth()
                .post('/teams', {
                    "PG": myStartingFive.PG,
                    "SG": myStartingFive.SG,
                    "SF": myStartingFive.SF,
                    "PF": myStartingFive.PF,
                    "C": myStartingFive.C
                })
                .then(newTeam => {
                    console.log(newTeam)
                })
                .catch(err => {
                    console.log(err)
                })
        
        newTeam()
    }

    const addPlayer = (e) => {
        setMyStartingFive({...myStartingFive,
            [e.target.id]: e.target.value
        })
        setAvailablePositions({...availablePositions,
            [e.target.id]: true
        })
        
        count += 1
        if(count === 5){            
            setTeamComplete("complete")
        }
    }

    const rankTeams = (evt) => {
        evt.preventDefault()
        axiosWithAuth()
                .post('/teams', {
                    "PG": myStartingFive.PG,
                    "SG": myStartingFive.SG,
                    "SF": myStartingFive.SF,
                    "PF": myStartingFive.PF,
                    "C": myStartingFive.C
                })
                .then(newTeam => {
                    console.log(newTeam)
                })
                .catch(err => {
                    console.log(err)
                })
        history.push('/rank-teams')
    }

    const rankTeamsWithoutSubmit = (evt) => {
        evt.preventDefault()
        if(count === 5){
            rankTeams(evt)
        }else{
            count = 0
            setMyStartingFive(initialStartingFive)
            history.push('/rank-teams')
        }
    }

    const leaderBoard = (evt) => {
        evt.preventDefault()
        count = 0
        setMyStartingFive(initialStartingFive)
        history.push('/leaderboard')
    }

    return(

        <div className="teamBuilder">
            <header>
            <HeaderButtons className="headerButton" onClick={rankTeamsWithoutSubmit}>Rank teams</HeaderButtons>
            <HeaderButtons className="headerButton" onClick={leaderBoard}>View Leaderboard</HeaderButtons>
            <HeaderButtons className="headerButton" onClick={logout}>Logout</HeaderButtons> 
            </header>
            
                {fiveTeams.length > 0 && count < 5 ? 
            <MainTeamBuilderBox>
                <TeamSelector>
                    <StartingFiveTitle>Select a player</StartingFiveTitle>
                    <Pick disabled={availablePositions.PG} className={availablePositions.PG === false ? "playerButton" : 'playerSelected'} onClick={addPlayer} value={fiveTeams[count].PG} id="PG">Pick {fiveTeams[count].PG}</Pick>
                    <Pick disabled={availablePositions.SG} className={availablePositions.SG === false ? "playerButton" : 'playerSelected'} onClick={addPlayer} value={fiveTeams[count].SG} id="SG">Pick {fiveTeams[count].SG}</Pick>
                    <Pick disabled={availablePositions.SF} className={availablePositions.SF === false ? "playerButton" : 'playerSelected'} onClick={addPlayer} value={fiveTeams[count].SF} id="SF">Pick {fiveTeams[count].SF}</Pick>
                    <Pick disabled={availablePositions.PF} className={availablePositions.PF === false ? "playerButton" : 'playerSelected'} onClick={addPlayer} value={fiveTeams[count].PF} id="PF">Pick {fiveTeams[count].PF}</Pick>
                    <Pick disabled={availablePositions.C} className={availablePositions.C === false ? "playerButton" : 'playerSelected'} onClick={addPlayer} value={fiveTeams[count].C} id="C">Pick {fiveTeams[count].C}</Pick>
                </TeamSelector>

                <MyTeam >
                    <StartingFiveTitle>Starting 5</StartingFiveTitle>
                    <Positions>PG: {myStartingFive.PG}</Positions>
                    <Positions>SG: {myStartingFive.SG}</Positions>
                    <Positions>SF: {myStartingFive.SF}</Positions>
                    <Positions>PF: {myStartingFive.PF}</Positions>
                    <Positions>C: {myStartingFive.C}</Positions>
                </MyTeam>
            </MainTeamBuilderBox>
                 : null}

                 {count === 5 ? 
                    <MainTeamBuilderBox>
                        <MyCompleteTeam className={teamComplete}>
                            <StartingFiveTitle>My starting five</StartingFiveTitle>
                                <Positions>PG: {myStartingFive.PG}</Positions>
                                <Positions>SG: {myStartingFive.SG}</Positions>
                                <Positions>SF: {myStartingFive.SF}</Positions>
                                <Positions>PF: {myStartingFive.PF}</Positions>
                                <Positions>C: {myStartingFive.C}</Positions>
                            <StartGame className="postTeamCreate" onClick={additionalTeam}>Draft new team</StartGame>
                            <StartGame className="postTeamCreate" onClick={rankTeams}>Rank teams</StartGame>
                        </MyCompleteTeam>
                    </MainTeamBuilderBox>
                : null}
        </div>
    )
}