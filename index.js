var   fs           = require('fs'),
      express      = require('express'),
      app          = express(),
      admin        = require("firebase-admin"),
      dir          = __dirname,
      env          = process.env;

admin.initializeApp({
  credential: admin.credential.cert("secret/creds.json"),
  databaseURL: "https://numbers-50666.firebaseio.com"
});
var db = admin.database();
var ref = db.ref('/').child('msg');

ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

ref.push({
  msg: 'Hello World'
});

var staticHomePage = function(req, res){
  console.log('Client requested home page.');
  res.sendFile(dir+'/static/index.html');
}
app.use('/assets', express.static(dir+'/static/assets'));

// Home page / Root URL
app.get('/', staticHomePage);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log('Application worker '+process.pid+' started at port '+(env.NODE_PORT || 3000)+'...');
});
