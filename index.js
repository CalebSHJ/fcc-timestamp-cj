// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:inputDate", (req, res) => {
  const inputDate = req.params.inputDate;
  const date = new Date(inputDate);
  const stringedDate = new Date(date).toUTCString();

  if (inputDate.match(/[0-9]{5,}/)) {
    parseIntInputDate = parseInt(inputDate);
    res.json({
      "unix": new Date(parseIntInputDate).getTime(),
      "utc": new Date(parseIntInputDate).toUTCString()
    })
  }
  if(stringedDate !== "Invalid Date") {
    res.json({
      "unix": new Date(date).getTime(),
      "utc": new Date(date).toUTCString()
    })
  }

  if(!inputDate.match(/[0-9]{5,}/) && stringedDate === "Invalid Date") {
    res.json({error: "Invalid Date"});
  }
 

  
});

app.get("/api", (req, res) => {
  const currentDate = new Date();
  const unixDate = new Date(currentDate).getTime();
  const utcDate = new Date(currentDate).toUTCString();
  res.json({"unix": unixDate, "utc": utcDate});
})


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
