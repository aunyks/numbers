var   fs           = require('fs'),
      express      = require('express'),
      app          = express(),
      dir          = __dirname,
      env          = process.env;

// ADD FIREBASE BACKEND ASAP

var staticHomePage = function (req, res){
  console.log('Client requested home page.');
  res.sendFile(dir+'/static/index.html');
}
app.use('/assets', express.static(dir+'/static/assets'));

// Home page / Root URL
app.get('/', staticHomePage);

app.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log('Application worker '+process.pid+' started at port '+(env.NODE_PORT || 3000)+'...');
});
