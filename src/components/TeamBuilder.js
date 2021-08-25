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
    justify-content: space-around;
    max-width: 50%;
`

const TeamSelector = styled.div`
    border: 1px solid blue;
    display: flex;
    margin-left: 5%;
    flex-wrap: wrap;
`

const MyTeam = styled.div`
    border: 1px solid blue;
    width: 50%;
`

const PlayerCards = styled.div`
    width: 51%;
    display:flex;
    justify-content: flex-start;
`

const Pick = styled.button`
    border: 1px solid red;
    height: 25px;
    margin: auto;
    &:hover {
        border: 5px solid red;
    }
`

let count = 0
export default function TeamBuilder(){
    const [fiveTeams, setFiveTeams] = useState([])
    const [myStartingFive, setMyStartingFive] = useState(initialStartingFive)
    const [teamComplete, setTeamComplete] = useState("incomplete")

    const newTeam = () => {
        if(count === 5){
            setMyStartingFive(initialStartingFive)
            count = 0
        }
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
        if(count === 5){
            setTeamComplete("complete")
        }
    }


    return(

        <div>
            <h1>teambuilder page</h1>
            <button onClick={newTeam}>build a new team</button>
            <MainTeamBuilderBox>
                {fiveTeams.length > 0 && count < 5 ? 
                <TeamSelector>
                <PlayerCards><h3>{fiveTeams[count].PG}</h3>   <Pick onClick={addPlayer} value={fiveTeams[count].PG} id="PG">Pick {fiveTeams[count].PG}</Pick></PlayerCards>
                <PlayerCards><h3>{fiveTeams[count].SG}</h3>  <Pick onClick={addPlayer} value={fiveTeams[count].SG} id="SG">Pick {fiveTeams[count].SG}</Pick></PlayerCards>
                <PlayerCards><h3>{fiveTeams[count].SF}</h3>  <Pick onClick={addPlayer} value={fiveTeams[count].SF} id="SF">Pick {fiveTeams[count].SF}</Pick></PlayerCards>
                <PlayerCards><h3>{fiveTeams[count].PF}</h3>  <Pick onClick={addPlayer} value={fiveTeams[count].PF} id="PF">Pick {fiveTeams[count].PF}</Pick></PlayerCards>
                <PlayerCards><h3>{fiveTeams[count].C}</h3>  <Pick onClick={addPlayer} value={fiveTeams[count].C} id="C">Pick {fiveTeams[count].C}</Pick></PlayerCards>
                </TeamSelector> : null}

                <MyTeam className={teamComplete}>
                    <h2>My starting five</h2>
                    <h3>PG: {myStartingFive.PG}</h3>
                    <h3>SG: {myStartingFive.SG}</h3>
                    <h3>SF: {myStartingFive.SF}</h3>
                    <h3>PF: {myStartingFive.PF}</h3>
                    <h3>C: {myStartingFive.C}</h3>
                </MyTeam>
            </MainTeamBuilderBox>
        </div>
    )
}