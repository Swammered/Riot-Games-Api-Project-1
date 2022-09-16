var express = require('express');
var cors = require('cors');
const axios = require('axios');
const { response } = require('express');

var app = express();

app.use(cors());

const API_KEY = "RGAPI-0e4cfdff-92f0-4358-b8ec-93a45ca5a4e7";

function getPlayerPUUID(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
}

app.get('/past5Games', async(req, res) => {
    const playerName = 'Swammer'
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY
    
   const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err);
    console.log(gameIDs);

    var matchDataArray = [];
    for(var i =0; i < gameIDs.length - 15; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://americas.api.riotgames.com/" + "lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
            .then(response => response.data)
            .catch(err => err)
        matchDataArray.push(matchData);
    }

    res.json(matchDataArray);

        
});


app.listen(4000, function (){
    console.log("server started on port 4000")
}) //localhost:4000



