window.onload= function(){
    var butt = document.getElementsByClassName("butt");
    var demo = document.getElementById("demo");
    var subScreen = document.getElementById("sub-screen").firstElementChild;
    var screen = document.getElementById("screen").firstElementChild;
    for(var i = 0; i < butt.length; i++){
        butt[i].addEventListener("click",function(){
            var value = this.value;
            var patt = /[\W]/;
            if(value == "c"){
                subScreen.value = "";
                screen.value = "0";
            }
            else if(!patt.test(subScreen.value[subScreen.value.length-1]) && value == "=") screen.value = eval(subScreen.value);
            else if(patt.test(value) && patt.test(subScreen.value[subScreen.value.length-1])) return false;
            else if(/[/*+.=]/.test(value) && subScreen.value == "") return false;
            else subScreen.value += value;
        });
    }
}

