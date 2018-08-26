const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const request = require('request');

var content = fs.readFileSync('fuel.txt');
var index = fs.readFileSync('index.html', 'utf8');
var jsonContent = JSON.parse(content);

//app.get('/', (req, res) => res.send(jsonContent.data.milage));
app.get('/', (req, res) => res.send(index));
app.get('/fuel/:numberPlate', (req, res) => {
    request('http://resources.fuelsaver.govt.nz/ecca_tools_resources/webservices/webservice.php?service=fuel_label_generator&action=get_text&ref_type=plate&ref_value=' + req.params.numberPlate, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const milage = JSON.parse(body).data.milage['value'].split(" ")[0];
          const results = {milage: parseFloat(milage)}
          res.send(JSON.stringify(results));
        }
    })
});


app.listen(3000, () => console.log('Our app is listening on port 3000!'));
