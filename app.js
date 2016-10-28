var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
var movieArray = [];

//Node API Call

var movie;
app.get('/', function(req, res){
  res.render('home');
});

app.post('/movieSearch', function(req, res){
  var movie = req.body.movieName;
  var url = 'https://www.omdbapi.com/?s='+movie+'';
  request(url, function(error, response, body){
    if(!error && res.statusCode === 200){
      var movieResults = JSON.parse(body);
      console.log(movieResults);
      for(var i = 0 ; i < movieResults.Search.length; i ++){
        movieArray.push(movieResults.Search[i].Title);
      }
      res.send(movieArray);
      // res.render('resultsPage', {movieArray: movieArray});
    }
  });
});

app.listen(4000, function(){
  console.log('Server Started');
});
