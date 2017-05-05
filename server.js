var express = require('express');

var app = express();
// server.use('/public', express.static(__dirname + '/public'));

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  
  return monthNames[monthIndex] + ' ' + day + ',' + ' ' + year;
};
1450137600000
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/:time', function(req, res){
    var unix = null;
    var natural = null;
    if(isNaN(req.params.time)) {
        var date = Date.parse(req.params.time);
        if (date){
            unix = date;
            natural = req.params.time;    
        };
    } else {
        // console.log(req.params.time + "0".repeat(13 - req.params.time.length));
        if(req.params.time.length <= 13) {
            var date = new Date(parseInt(req.params.time + "0".repeat(13 - req.params.time.length)));   
        }
        if (date){
            unix = req.params.time;
            natural = formatDate(date);
        };
    }
//   console.log(parseInt(req.params.time));
//   var date = new Date(parseInt(req.params.time));
//   console.log(date);
  var obj = {
      "unix":unix,
      "natural":natural
  };
  res.json(obj);
});






var port = 8080;
app.listen(port, function() {
  console.log('server listening on port ' + port);
  console.log('https://freecodecamp-husseinraoouf.c9users.io');
});

