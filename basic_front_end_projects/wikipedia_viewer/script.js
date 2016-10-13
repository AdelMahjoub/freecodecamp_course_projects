$(document).ready(function(){
  //click event listener on the search button  
  $("#submitBtn").on("click", function(e){
    e.preventDefault();
    //get the value of the input field
    var keyWord = document.getElementById("input").value;
    //if no entry in the input field then do nothing : return false;  
    if(keyWord == "") return false;
    //wikipedia api entry point : action = opensearch + user input -> url 
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=" + keyWord;
    //http request -> wikipedia api -> response is data = ["string", [array], [array], [array]]
    $.getJSON(url, function(data){
      $("#demo").html("");//clean former search result
      //loop throu data and populate html
      for(var i = 0; i < data[1].length; i++){
        var h4 = document.createElement('h4');
        h4.innerHTML = (data[1][i]);
        var p = document.createElement('p');
        p.innerHTML = ( data[2][i]);
        var a = document.createElement('a');
        a.innerHTML = (data[3][i]);
        $(a).attr('href', data[3][i]);
        $(a).attr('target', "_blank");
        var div = document.createElement('div');
        $(div).addClass("col-xs-12");
        $(div).append(h4, p, a);
        $("#demo").append("<div class=\"row\"><hr></div>", div, "<div class=\"row\"><hr></div>");
       }
    });
  }); 
});
  
