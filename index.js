const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 40000;

app.use(express.static("public"));

app.use( bodyParser.json() ); 

app.use(bodyParser.urlencoded({     
  extended: true
}));

// Sends all urls of the requested type animal 
app.get("/animal", (req,res) => {

    let type = req.query.type;

    let rawdata = fs.readFileSync('./database/animal.json');
    let animals = JSON.parse(rawdata);
    
    let urls = new Array();

    animals.forEach(element => {
        if (element.type == type) {
            urls.push({  "url": element.url });
        }
    });

    res.send(urls);
});

// Sends API's information
app.get("/informationApi", (req,res) => {

    let rawdata = fs.readFileSync('./package.json');
    let apiData = JSON.parse(rawdata);

    let informationApiJson = {
        name: apiData.name,
        version : apiData.version,
        description : apiData.description,
        author : apiData.author
    };

    res.send(informationApiJson);
});



app.listen(port, () => {
    console.log("Listening: http://localhost:" + port);
});