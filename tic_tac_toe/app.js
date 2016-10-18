window.onload = function(){
//////////////////////////////////////////////////////////////////////////////////////////////
//variables
//////////////////////////////////////////////////////////////////////////////////////////////
    //actor object : player and cpu
    var actor = function(name){
        this.name = name;
        this.arr = [];
        this.winState = false;
        this.icon="";
    }
    var player = new actor("YOU");
    var cpu = new actor("CPU");
    //board of the game
    var cell = document.getElementsByClassName("cell");
    //Win combinations
    var winArr = [
        ["1","2","3"],
        ["1","4","7"],
        ["1","5","9"],
        ["2","5","8"],
        ["4","5","6"],
        ["7","8","9"],
        ["3","5","7"],
        ["3","6","9"]
    ];
    //indexes for cpu to pick from, become shorter as the game goes on
    var poss = ["0","1","2","3","4","5","6","7","8"];
    //number of total moves for the player and the cpu
    var token = 9;
    var wins = 0, ties = 0, loss = 0;
//////////////////////////////////////////////////////////////////////////////////////////////
//functions
//////////////////////////////////////////////////////////////////////////////////////////////
    //player icon choice, will be called by addeventListener on intro div
    function init(){
        player.icon = this.value;
        if(player.icon == "O") cpu.icon = "X";
        else cpu.icon = "O";
        document.getElementById('board').style.display = "block";
        document.getElementById('intro').style.display = "none";
        document.getElementById('o_type').removeEventListener("click",init)
        document.getElementById('x_type').removeEventListener("click",init);
    }
    //--------------------------------------------------------------------------------------
    //reset function
    function reset(){
        player.arr = [];
        cpu.arr = [];
        poss = ["0","1","2","3","4","5","6","7","8"];
        player.winState = cpu.winState = false;
        for(var key = 0 ; key < cell.length; key++){
            cell[key].firstElementChild.value = (key+1).toString();
            cell[key].firstElementChild.style.visibility="hidden";
            cell[key].addEventListener('click', play);
        }
        document.getElementById("message").style.display = "none";
        token = 9;
    }
    //--------------------------------------------------------------------------------------
    //check the winner function
    function checkWinner(){
        if(player.arr.length >= 3){
            for(var j = 0; j < winArr.length; j++){
                var count = 0;
                for( var k = 0; k < player.arr.length; k++){
                    if(winArr[j].includes(player.arr[k])) count++;
                }
                if(count == 3){
                    player.winState = true;
                    break;
                }
            }
        }
        if(cpu.arr.length >= 3){
            for(j = 0; j < winArr.length; j++){
                count = 0;
                for(k = 0; k < cpu.arr.length; k++){
                    if(winArr[j].includes(cpu.arr[k])) count++;
                }
                if(count == 3){
                    cpu.winState = true;
                    break;
                }
            }
        }
        if(player.winState){
            for(j = 0; j < cell.length; j++){
                cell[j].removeEventListener('click', play);
            }
            document.getElementById("message").innerHTML = player.name + " WIN";
            wins++;
            document.getElementById("score").firstElementChild.firstElementChild.innerHTML = wins;
            document.getElementById("message").style.display = "block";
            setTimeout(reset, 1200);
            return false;
        }else if((token === 0 && cpu.winState == false && player.winState == false) || (cpu.winState == true && player.winState == true) ){
            document.getElementById("message").innerHTML = "TIE";
            document.getElementById("message").style.display = "block";
            ties++;
            var tie = document.getElementById("score").childNodes;
            tie[3].firstElementChild.innerHTML = ties;
            setTimeout(reset, 1200);
            return false;
        }else if(cpu.winState){
          console.log("cpu wins");
            for(j = 0; j < cell.length; j++){
                cell[j].removeEventListener('click', play);
            }
            document.getElementById("message").innerHTML = cpu.name + " WIN";
            loss++;
            document.getElementById("score").lastElementChild.firstElementChild.innerHTML = loss;
            document.getElementById("message").style.display = "block";
            setTimeout(reset, 1200);
            return false;
        }
    }    
    //----------------------------------------------------------------------------------------
    //main game function, will be called by addEventListener on game board
    function play(){
        //Player Turn
        var value = this.firstElementChild.value;
        this.firstElementChild.style.visibility="visible";
        this.firstElementChild.value = player.icon;
        this.firstElementChild.style.color = "#002635";
        var index = Number(value) - 1;
        player.arr.push(value);
        poss.splice(poss.indexOf(index.toString()),1 );
        this.removeEventListener('click', play);
        token --;
        //---------------------------------------------------//fix prevent last move of cpu
      if(player.arr.length >= 3){
            for(var j = 0; j < winArr.length; j++){
                var count = 0;
                for( var k = 0; k < player.arr.length; k++){
                    if(winArr[j].includes(player.arr[k])) count++;
                }
                if(count == 3){
                    player.winState = true;
                    break;
                }
            }
        }
        //------------------------------------------------------
        //CPU Turn
      if(player.winState == false){
        var i;
        var picked = false;
        if(poss[0] != undefined){//--enter this loop only if poss contains indexes
            while(!picked){
                var offense = 0, defense = 0; 
                var defenseIndex, offenseIndex;
                var thePick;
                if(player.arr.length >= 2){//-------------------------index to defend
                    for(var next = 0; next < poss.length; next ++){
                        thePick = false;
                        var temp = [];
                        temp = player.arr.map(function(a){return a;});
                        i = Number(poss[next]);
                        temp.push(cell[i].firstElementChild.value);
                        for(var j = 0; j < winArr.length; j++){
                            var count = 0;
                            for(var k = 0; k < temp.length; k++){
                                if(winArr[j].includes(temp[k])) count++;
                            }
                            if(count == 3){
                                thePick = true;
                                defense++;
                                defenseIndex = i;
                                break;
                            }
                        }
                        if(thePick) break;
                    }
                }//----------------------------------------------------end of index to defend
                
                if(cpu.arr.length >= 2){//-----------------------------index to win
                    for(next = 0; next < poss.length; next ++){
                        thePick = false;
                        temp = [];
                        temp = cpu.arr.map(function(a){return a;});
                        i = Number(poss[next]);
                        temp.push(cell[i].firstElementChild.value);
                        for(var j = 0; j < winArr.length; j++){
                            var count = 0;
                            for(var k = 0; k < temp.length; k++){
                                if(winArr[j].includes(temp[k])) count++;
                            }
                            if(count == 3){
                                thePick = true;
                                offense += 10;
                                offenseIndex = i; 
                                break;
                            }
                        }
                        if(thePick) break;
                    }
                }//----------------------------------------------------end of index to win
                //choice between defense or win move
                if(offense > defense) i = offenseIndex;
                else i = defenseIndex;

                //if no defense or win move possible
                if(offense == 0 && defense == 0){
                    if(player.arr.length < 2){
                        if(player.arr[0] != "5"){
                            if(poss.includes("4")) i = "4"; 
                        }else if(player.arr[0] == "5"){
                            var corner = ["0", "2", "6", "8"];
                            corner.sort(function(a,b){return 0.5 - Math.random();});
                            i = corner[0];
                                 
                        }
                        else{
                            var randomPos = poss.map(function(a){return a;});
                            randomPos.sort(function(a,b){return 0.5 - Math.random();});
                            i = randomPos[0];
                            }
                    }else{
                        var randomPos = poss.map(function(a){return a;});
                        randomPos.sort(function(a,b){return 0.5 - Math.random();});
                        i = randomPos[0];
                    }
                }
                if(poss.includes(i.toString())){
                    cpu.arr.push(cell[i].firstElementChild.value);
                    poss.splice(poss.indexOf(i.toString()),1 );
                    picked = true;
                    token--;
                }
            }
        }
      }
        if(i != undefined){
            cell[i].firstElementChild.style.visibility="visible";
            cell[i].firstElementChild.value = cpu.icon;     
            cell[i].firstElementChild.style.color="#AB1A25";
            cell[i].removeEventListener('click', play);     
        }
       checkWinner();
    }
////////////////////////////////////////////////////////////////////////////////////////////////
//execution
////////////////////////////////////////////////////////////////////////////////////////////////
    //board hidden on load
    (function(){
        document.getElementById('board').style.display = "none";
    })();
    document.getElementById('o_type').addEventListener("click",init);
    document.getElementById('x_type').addEventListener("click",init);
    for(var key = 0 ; key < cell.length; key++){
        cell[key].addEventListener('click', play);
    }
}
