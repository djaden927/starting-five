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

const MainTeamBuilderBox = styled.div`
    display: flex;
`

const TeamSelector = styled.div`
    margin: 0 5%;
    border: 1px solid blue;
`
let count = 0
export default function TeamBuilder(){
    const [fiveTeams, setFiveTeams] = useState([])
    const [myStartingFive, setMyStartingFive] = useState(initialStartingFive)
    

    const newTeam = () => {
        let randomTeamList = []
        for(let i = 0; i < 5; i++){
            randomTeamList.push(data[Math.floor(Math.random() * 30)])
        }
        setFiveTeams(randomTeamList)
    }

    const addPlayer = (e) => {
        setMyStartingFive({...myStartingFive,
            [e.target.id]: e.target.value
        })
        count += 1
        console.log(count)
    }


    return(

        <div>
            <h1>teambuilder page</h1>
            <button onClick={newTeam}>build a new team</button>
            <MainTeamBuilderBox>
                {fiveTeams.length > 0 && count < 5 ? 
                <TeamSelector>
                <h2>{fiveTeams[count].PG}</h2>   <button onClick={addPlayer} value={fiveTeams[count].PG} id="PG">Pick {fiveTeams[count].PG}</button>
                <h2>{fiveTeams[count].SG}</h2>  <button onClick={addPlayer} value={fiveTeams[count].SG} id="SG">Pick {fiveTeams[count].SG}</button>
                <h2>{fiveTeams[count].SF}</h2>  <button onClick={addPlayer} value={fiveTeams[count].SF} id="SF">Pick {fiveTeams[count].SF}</button>
                <h2>{fiveTeams[count].PF}</h2>  <button onClick={addPlayer} value={fiveTeams[count].PF} id="PF">Pick {fiveTeams[count].PF}</button>
                <h2>{fiveTeams[count].C}</h2>  <button onClick={addPlayer} value={fiveTeams[count].C} id="C">Pick {fiveTeams[count].C}</button>
                </TeamSelector> : null}

                <div>
                    <h2>My starting five</h2>
                    <h3>PG: {myStartingFive.PG}</h3>
                    <h3>SG: {myStartingFive.SG}</h3>
                    <h3>SF: {myStartingFive.SF}</h3>
                    <h3>PF: {myStartingFive.PF}</h3>
                    <h3>C: {myStartingFive.C}</h3>
                </div>
            </MainTeamBuilderBox>
        </div>
    )
}