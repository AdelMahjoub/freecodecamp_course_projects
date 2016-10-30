document.addEventListener("DOMContentLoaded", function(event){
  var all = document.getElementById('all');//all channels section
  var on = document.getElementById('on');//online channels section
  var off = document.getElementById('off');//offline channels section
  //cross browser xmlhttprequest
  var getHttpRequest = function(){
    var httpRequest = false;
    if(window.XMLHttpRequest){
      httpRequest = new XMLHttpRequest();
      if(httpRequest.overrideMimeType){
        httpRequest.overrideMimeType('text/xml');
      }
    }
    else if (window.ActiveXObject) {
         try {
             httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
         }
         catch (e) {
             try {
                 httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
             }
             catch (e) {}
         }
     }
      if (!httpRequest) {
            alert('Abandon :( Impossible de créer une instance XMLHTTP');
            return false;
      }
    return httpRequest;
  } 
  var httpRequest_Info = getHttpRequest(); // Requst for channel Infos
  var httpRequest_Status = getHttpRequest();//Request for channel Status
  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];//channels list
  var channelInfo = [];
  var channelStatus = [];
  //current panel
  var i = 0;
  //Create a channel Panel
  function createPanel(){
    var panel = document.createElement('div');
    panel.classList.add('panel');
    panel.classList.add('panel-default')
    var panelBody = document.createElement('div');
    panelBody.classList.add('panel-body');
    var panelFooter = document.createElement('div');
    panelFooter.classList.add('panel-footer');
    panel.appendChild(panelBody);
    panel.appendChild(panelFooter);
    return panel;
  }
  //Create a Panel elements for content
  function fillPanel(body, footer){
    var span = document.createElement('span');
    var img = document.createElement('img');
    img.classList.add('img-circle');
    span.appendChild(img);
    var h4 = document.createElement('h4');
    h4.classList.add('channel-title');
    var small = document.createElement('small');
    small.classList.add('channel-status');
    var a = document.createElement('a');
    a.classList.add('channel-link');
    a.setAttribute('target','_blank');
    footer.appendChild(a);
    body.appendChild(span);
    body.appendChild(h4);
    body.appendChild(small);
  }
  //placeHolders for section(all)
  for(var j = 0; j < channels.length; j++){
    all.appendChild(createPanel());
    var panelBody = document.getElementsByClassName('panel-body');
    var panelFooter = document.getElementsByClassName('panel-footer');
    fillPanel(panelBody[j], panelFooter[j]);
  }
  //Generate an Url for a request
  function makeUrl(type, channel){
    return "https://api.twitch.tv/kraken/" + type + "/" +channel + "?client_id=c8a3wkkb56yqjhlcui7tcfyjvs65dy6"
  }
  //Get Offline channel Info
  function getInfo(httpRequest, arr, request, channel,i){
    httpRequest.open('GET', makeUrl(request,channel));
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4 && httpRequest.status === 200){
            var data = (JSON.parse(this.response));
            arr.push(data);
            document.getElementsByClassName('img-circle')[i].setAttribute('src',data.logo);
            document.getElementsByClassName('channel-title')[i].innerHTML = data.display_name;
            document.getElementsByClassName('channel-link')[i].setAttribute('href',data.url);
            document.getElementsByClassName('channel-link')[i].innerHTML = data.url;
            var panel = document.getElementsByClassName('panel');
            document.getElementById('off').appendChild(panel[i].cloneNode(true));
        }else{
            return false;
            }
        }
    httpRequest.send(); 
  }
  //Get Online channel Info
  function getStatus(httpRequest, arr, request, channels, i){
    if(arr.length === channels.length) return true;
    else{
      httpRequest.open('GET', makeUrl(request,channels[i]));
      httpRequest.onreadystatechange = function(){
          if(httpRequest.readyState === 4 && httpRequest.status === 200){
              var data = (JSON.parse(this.response));
              arr.push(data);
            if(arr[i] != undefined){
            if(arr[i].stream != null){
              document.getElementsByClassName('img-circle')[i].setAttribute('src',arr[i].stream.channel.logo);
              document.getElementsByClassName('channel-title')[i].innerHTML = arr[i].stream.channel.display_name;
              document.getElementsByClassName('channel-link')[i].setAttribute('href',arr[i].stream.channel.url);
              document.getElementsByClassName('channel-link')[i].innerHTML = arr[i].stream.channel.url;
              document.getElementsByClassName('channel-status')[i].innerHTML = arr[i].stream.channel.status;
              var panel = document.getElementsByClassName('panel');
              document.getElementById('on').appendChild(panel[i].cloneNode(true));
              }else{
                var str = channels[i];
                var x = i;
                document.getElementsByClassName('channel-status')[i].innerHTML = "____";
                getInfo(httpRequest_Info, channelInfo, "channels", str, x);
              }
            }
            i++;
            getStatus(httpRequest, arr, request, channels, i);
          }else{
              return false;
          }
      }
      httpRequest.send(); 
    }
  }
  //make a httpRequest
  getStatus(httpRequest_Status, channelStatus, "streams", channels, i);
});
