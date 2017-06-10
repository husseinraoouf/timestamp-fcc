const express = require('express'),
      exphbs = require('express-handlebars');

var app = express();

var hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


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


app.get('/', function(req, res){
  res.render('home', {url: 'https://hussein-timestamp-fcc.herokuapp.com'});
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
        if(req.params.time.length <= 13) {
            var date = new Date(parseInt(req.params.time + "0".repeat(13 - req.params.time.length)));
        }
        if (date){
            unix = req.params.time;
            natural = formatDate(date);
        };
    }
  var obj = {
      "unix":unix,
      "natural":natural
  };
  res.json(obj);
});






var port = process.argv[2];
app.listen(port, function() {
  console.log('server listening on port ' + port);
});
