var   fs           = require('fs'),
      express      = require('express'),
      app          = express(),
      dir          = __dirname,
      env          = process.env;

var delimiter = '====DELIMIT MSG====';

function appendFile(filename, msg){
  fs.appendFile(filename, msg, function(err){
    if(err) throw err;
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function encodeMsg(str){
  var newStr = '';
  for(var i = 0; i < str.length; i++)
    newStr += str.charCodeAt(i) + ' ';
  return newStr;
}

appendFile('msgs.log', 'This is a secret message...');

var staticHomePage = function(req, res){
  res.sendFile(dir+'/static/index.html');
};

var newMsg = function(req, res){
  appendFile('msgs.log', (req.query.msg + '\n' + delimiter + '\n'));
  res.send('OK');
};

var getMsg = function(req, res){
  fs.readFile("msgs.log", "utf-8", function(err, data){
    var elems = data.split(delimiter);
    if(elems.length > 0){
      var randomIdx = getRandomInt(0, elems.length);
      var msg = encodeMsg(elems[randomIdx]).trim();
      if(msg === '10' || msg === '')
        res.send('This is a secret message...');
      else
        res.send(msg);
    } else {
      res.send('This is a secret message...');
    }
  });
};

app.use('/assets', express.static(dir+'/static/assets'));
// Home page / Root URL
app.get('/', staticHomePage);

app.get('/new-msg', newMsg);

app.get('/msg', getMsg);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function(){
  console.log('Starting Numbers Station...');
});
