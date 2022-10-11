import React, { useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import logo from './logo.svg';
import './App.css';


function App() {
  const [searchtext, setSearchtext] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames(event) {
    axios.get("http://localhost:4000/past5Games", { params: {username: searchtext}})
    .then(function (response) {
      setGameList(response.data);
    }).catch(function (error){
      console.log(error);
    })
  }

  console.log(gameList);

  return (
    <div className="App">
      <h2>Welcome to our proxy server app!</h2>
      <input type="text" onChange={e => setSearchtext(e.target.value)}></input>
      <Button variant="contained" onClick={e => getPlayerGames(e)}>Get the past 5 games for your player</Button>
      <button onClick={e => getPlayerGames(e)}>Get the past 5 games for your player</button>
      {gameList.length !== 0 ? 
          <>
            <p> we have data </p>
            {
              gameList.map((gameData, index) =>
                <>
                  <h2> Game {index +1}</h2>
                    <div>
                      {gameData.info.participants.map((data,participantIndex) =>
                        <p>PLAYER {participantIndex + 1}: {data.summonerName}, KDA: {data.kills}, {data.deaths}, {data.assists}</p>
                      )
                      }
                    </div>
                </>
              )
            }
          </>
        :
          <>
            <p> we have NO data </p>
          </>
      }
    </div>
  );
}

export default App;
