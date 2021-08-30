import {data} from "../data/lineupdata"
import React, {useState} from "react"
import styled from "styled-components"

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
    border: 1px solid red;
`

const TeamSelector = styled.div`
    border: 1px solid blue;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const MyTeam = styled.div`
    border: 1px solid blue;
    width: 100%;
`

const PlayerCards = styled.div`
    width: 51%;
    display:flex;
    justify-content: flex-start;

`

const Pick = styled.button`

& .playerButton{
    display: none
}

    // border: 1px solid red;
    height: auto;
    margin: .5% auto;
    width: 80%;
    &:hover {
        border: 2px solid black;
    }
        line-height: 40px;
        font-size: 18px;
        font-family: sans-serif;
        text-decoration: none;
        color: #000;
        border: 2px solid #333;
        letter-spacing: 2px;
        text-align: center;
        position: relative;
        transition: all .35s;
      
      position: relative;
      z-index: 2;
      
      &:after{
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: #53565A;
        transition: all .35s;
        opacity: 0.5;
      }
      
      &:hover{
        // color: #fff;
      }
      
      &:hover:after{
        width: 100%;
      }
`
const PlayerName = styled.h3`
    width: 100%;
`

let count = 0
export default function TeamBuilder(){
    const [fiveTeams, setFiveTeams] = useState([])
    const [myStartingFive, setMyStartingFive] = useState(initialStartingFive)
    const [teamComplete, setTeamComplete] = useState("incomplete")
    const [availablePositions, setAvailablePositions] = useState(initialAvailablePositions)
    const [startTeam, setStartTeam] = useState(false)

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
        setStartTeam(true)
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
            setStartTeam(false)
        }
    }


    return(

        <div>
            <button disabled={startTeam} onClick={newTeam}>build a new team</button>
                {fiveTeams.length > 0 && count < 5 ? 
            <MainTeamBuilderBox>
                <TeamSelector>
                <h2>Select a player</h2>
                <Pick disabled={availablePositions.PG} className="playerButton" onClick={addPlayer} value={fiveTeams[count].PG} id="PG">Pick {fiveTeams[count].PG}</Pick>
                <Pick disabled={availablePositions.SG} className="playerButton" onClick={addPlayer} value={fiveTeams[count].SG} id="SG">Pick {fiveTeams[count].SG}</Pick>
                <Pick disabled={availablePositions.SF} className="playerButton" onClick={addPlayer} value={fiveTeams[count].SF} id="SF">Pick {fiveTeams[count].SF}</Pick>
                <Pick disabled={availablePositions.PF} className="playerButton" onClick={addPlayer} value={fiveTeams[count].PF} id="PF">Pick {fiveTeams[count].PF}</Pick>
                <Pick disabled={availablePositions.C} className="playerButton" onClick={addPlayer} value={fiveTeams[count].C} id="C">Pick {fiveTeams[count].C}</Pick>
                </TeamSelector>

                <MyTeam className={teamComplete}>
                    <h2>My starting five</h2>
                    <h3>PG: {myStartingFive.PG}</h3>
                    <h3>SG: {myStartingFive.SG}</h3>
                    <h3>SF: {myStartingFive.SF}</h3>
                    <h3>PF: {myStartingFive.PF}</h3>
                    <h3>C: {myStartingFive.C}</h3>
                </MyTeam>
            </MainTeamBuilderBox>
                 : null}

                 {count === 5 ? <MyTeam className={teamComplete}>
                    <h2>My starting five</h2>
                    <h3>PG: {myStartingFive.PG}</h3>
                    <h3>SG: {myStartingFive.SG}</h3>
                    <h3>SF: {myStartingFive.SF}</h3>
                    <h3>PF: {myStartingFive.PF}</h3>
                    <h3>C: {myStartingFive.C}</h3>
                </MyTeam> : null}
        </div>
    )
}