var express = require('express');

var app = express();

app.use(express.static('src'));
app.use(express.static('../build/contracts'));

express.static(__dirname + '/src')

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(3000, function () {
    console.log('certif-app listening on port 3000!');
});