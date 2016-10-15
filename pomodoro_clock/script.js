window.onload = function(){
    var workTimeScreen = document.getElementById('work');
    var pauseTimeScreen = document.getElementById('break');
    var timerScreen = document.getElementById('timer');
    var workTime = (25).toLocaleString(undefined, {minimumIntegerDigits: 2});
    var breakTime = (5).toLocaleString(undefined, {minimumIntegerDigits: 2});
    var workSec = (0).toLocaleString(undefined, {minimumIntegerDigits: 2});
    var breakSec = (0).toLocaleString(undefined, {minimumIntegerDigits: 2});
    var play = document.getElementById("play-button");
    var start = false;
    var workBtnPlus = document.getElementById('work-button-plus');
    var workBtnMinus = document.getElementById('work-button-minus');
    var breakBtnPlus = document.getElementById('break-button-plus');
    var breakBtnMinus = document.getElementById('break-button-minus');
    var resetBtn = document.getElementById('reset');
    var timing;
    var workSoundPlayed = false;
    var breakSoundPlayed = false;

    function addWorkTime(){
        if(workTime < 59 ){
            PlaySoundAdd();
            workTime++;
            workTimeScreen.innerHTML = workTime.toLocaleString(undefined, {minimumIntegerDigits: 2})+ ":" + workSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
        }
    }
    function decreaseWorkTime(){
        if(workTime > 0){
            PlaySoundMinus();
            workTime --;
            workTimeScreen.innerHTML = workTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + workSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
        }
    }
    function addPauseTime(){
        if(breakTime < 59 ){
            PlaySoundAdd();
            breakTime++;
            pauseTimeScreen.innerHTML  = breakTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + breakSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
        }
    }
    function decreasePauseTime(){
        if(breakTime > 0){
            PlaySoundMinus();
            breakTime--;
            pauseTimeScreen.innerHTML = breakTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + breakSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
        }
    }
    function timer(){
        if(start){
            if(workTime >= 0){
                if(workSec > 0){
                    workSec--;
                    timerScreen.innerHTML = workTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + workSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                    workTimeScreen.innerHTML = workTime + ":" + workSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                }
                if(workSec == 0 && workTime > 0){
                    workTime --;
                    workSec = 59;
                    timerScreen.innerHTML = workTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + workSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                    workTimeScreen.innerHTML = workTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + workSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                }
            }
            if(workSec == 0 && workTime == 0 &&  breakTime >= 0){
                if(breakSec > 0){
                    breakSec--;
                    timerScreen.innerHTML = breakTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" +breakSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                    pauseTimeScreen.innerHTML = breakTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + breakSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                }
                if(breakSec == 0 && breakTime > 0){
                    breakTime --;
                    breakSec = 59;
                    timerScreen.innerHTML = breakTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + breakSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                    pauseTimeScreen.innerHTML = breakTime.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + breakSec.toLocaleString(undefined, {minimumIntegerDigits: 2});
                }
            }
        }
        if(workTime == 0 && workSec == 0){
            if(!workSoundPlayed){
                workSoundPlayed = true;
                PlaySoundFinish();
            }
        }
        if(breakTime == 0 && breakSec == 0){
            if(!breakSoundPlayed){
                breakSoundPlayed = true;
                PlaySoundFinish();
            }
        }
        if(workTime == 0  && breakTime == 0 && workSec == 0 && breakSec == 0){
            if(document.getElementById("work-led").classList.contains("led-green")){
                document.getElementById("work-led").classList.remove("led-green");
                document.getElementById("work-led").classList.add("led-red");
            }
            start = false;
            workSoundPlayed = false;
            breakSoundPlayed = false;
            workTime = 0;
            breakTime = 0;
            clearInterval(timing);
        }
    }
    function startStop(){
        PlaySoundStart();
        start = !start;
        if(start){
            timing = setInterval(timer, 1000);
            document.getElementById("work-led").classList.remove("led-red");
            document.getElementById("work-led").classList.add("led-green");
        }
        else{
            document.getElementById("work-led").classList.remove("led-green");
            document.getElementById("work-led").classList.add("led-red");
            clearInterval(timing);
        }
    }
    function PlaySoundAdd() {
          var sound = document.getElementById("audioPlus");
          sound.play();
    }
    function PlaySoundMinus() {
          var sound = document.getElementById("audioMinus");
          sound.play();
    }
    function PlaySoundStart() {
          var sound = document.getElementById("audioStart");
          sound.play();
    }
    function PlaySoundFinish() {
          var sound = document.getElementById("workFinish");
          sound.play();
    }
    function PlaySoundReset() {
          var sound = document.getElementById("resetSound");
          sound.play();
    }
    function reset(){
        PlaySoundReset();
        if(timing) clearInterval(timing);
        start = false;
        workSoundPlayed = false;
        breakSoundPlayed = false;
        workTime = (25).toLocaleString(undefined, {minimumIntegerDigits: 2});
        breakTime = (5).toLocaleString(undefined, {minimumIntegerDigits: 2});
        workSec = (0).toLocaleString(undefined, {minimumIntegerDigits: 2});
        breakSec = (0).toLocaleString(undefined, {minimumIntegerDigits: 2});
        workTimeScreen.innerHTML = workTime+ ":" + workSec;
        pauseTimeScreen.innerHTML = breakTime + ":" + breakSec;
        timerScreen.innerHTML = workTime + ":" + workSec;
        if(document.getElementById("work-led").classList.contains("led-green")){
            document.getElementById("work-led").classList.remove("led-green");
            document.getElementById("work-led").classList.add("led-red");
        }
    }

    workTimeScreen.innerHTML = workTime+ ":" + workSec;
    pauseTimeScreen.innerHTML = breakTime + ":" + breakSec;
    timerScreen.innerHTML = workTime + ":" + workSec;
    workBtnPlus.addEventListener("click",addWorkTime);
    workBtnMinus.addEventListener("click", decreaseWorkTime);
    breakBtnPlus.addEventListener("click",addPauseTime);
    breakBtnMinus.addEventListener("click", decreasePauseTime);
    play.addEventListener("click", startStop);
    resetBtn.addEventListener("click", reset);
}
