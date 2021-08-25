import {data} from "../data/lineupdata"
import React, {useState} from "react"
import styled from "styled-components"

export default function TeamBuilder(){
    const [fiveTeams, setFiveTeams] = useState([])

    const newTeam = () => {
        let randomTeamList = []
        for(let i = 0; i < 5; i++){
            randomTeamList.push(data[Math.floor(Math.random() * 6)])
        }
        setFiveTeams(randomTeamList)
    }

    return(

        <div>
            <h1>teambuilder page</h1>
            <button onClick={newTeam}>build a new team</button>
            {fiveTeams.length > 0 ? 
            <div>
            <h2>{fiveTeams[0].PG}</h2>   <button onClick="addPlayer" id="PG">Pick {fiveTeams[0].PG}</button>
            <h2>{fiveTeams[0].SG}</h2>  <button onClick="addPlayer" id="SG">Pick {fiveTeams[0].SG}</button>
            <h2>{fiveTeams[0].SF}</h2>  <button onClick="addPlayer" id="SF">Pick {fiveTeams[0].SF}</button>
            <h2>{fiveTeams[0].PF}</h2>  <button onClick="addPlayer" id="PF">Pick {fiveTeams[0].PF}</button>
            <h2>{fiveTeams[0].C}</h2>  <button onClick="addPlayer" id="C">Pick {fiveTeams[0].C}</button>
            </div> : null}
        </div>
    )
}