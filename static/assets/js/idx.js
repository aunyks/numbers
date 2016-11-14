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
  console.log(document.getElementById('input-field').value)
  return false;
}

window.onload = function(){
  httpGetAsync(window.location.href + 'msg', function(msg){
    document.getElementById('msg').innerHTML = msg;
  });
};
