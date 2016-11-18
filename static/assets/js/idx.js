function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function sendMsg(){
  var msgStr = document.getElementById('input-field').value.split(' ').join('+');
  httpGetAsync(window.location.href + 'new-msg?msg=' + msgStr,
  function(){
    alert('Your message has been sent! Thanks.');
  });
  if(window.location.href.charAt(window.location.href.length - 1) === '#')
    window.location = window.location.href.substring(0, window.location.href - 1);
  else
    window.location = window.location.href;
}

function infoBox(){
  alert('This is a modern take on Cold War era Numbers Stations!\n'+
        'Write a secret message and post it. It will be encoded into numbers and publically displayed for all to see. Who will decipher it and respond to you?');
}

window.onload = function(){
  if(window.location.href.charAt(window.location.href.length - 1) === '#')
    httpGetAsync(window.location.href.substring(0, window.location.href - 1) + 'msg', function(msg){
      document.getElementById('msg').innerHTML = msg;
    });
  else
    httpGetAsync(window.location.href + 'msg', function(msg){
      document.getElementById('msg').innerHTML = msg;
    });
};
