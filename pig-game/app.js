var scores,roundScore,activePlayer,gamePlaying,previousDice,winningScore;
init();
document.querySelector(".btn-roll").addEventListener("click",function(){
	if(gamePlaying && winningScore){
	   let dice = Math.floor(Math.random() * 6) + 1;
	    //display the result
	    let diceDOM = document.querySelector(".dice");
	    diceDOM.style.display = "block";
	    diceDOM.src = "dice-" + dice + ".png";

	    //after the dice hits point 1 do this
	    if(dice === 6 && previousDice === 6){
           scores[activePlayer] = 0;
           document.getElementById("score-" + activePlayer).textContent = 0;
           switchPlayer();
	    }else if(dice !== 1){
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			//switch to next player
			switchPlayer();
		}
	   

	    previousDice = dice;
	}


});

document.querySelector(".btn-hold").addEventListener("click",function(){
	if(gamePlaying) {
		//add a current score to global score
        scores[activePlayer] += roundScore;
		//update UI
        document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
		//check if the player won the game
        if(scores[activePlayer] >= winningScore){
	      	document.getElementById("name-" + activePlayer).textContent = "Winner!";
	      	document.querySelector(".dice").style.display = "none";
	      	document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
	      	document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
	      	gamePlaying = false;
	    } else {
	      	switchPlayer();
	    }
	}
	
     
});
document.querySelector(".btn-new").addEventListener("click",function(){
	init();
});

function init() {
	scores = [0,0]; //global scores
	roundScore = 0;
	activePlayer= 0;
	gamePlaying = true;
    previousDice = 0;
	document.querySelector("#score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	document.querySelector(".dice").style.display = "none";

	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
	document.querySelector(`input[type="submit"]`).addEventListener("click",function(){
		winningScore = document.querySelector("#win-score").value;
		document.querySelector("#win-score").value = "";
	});
}

function switchPlayer(){
	    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    	roundScore = 0;
    	document.querySelector("#current-0").textContent = "0";
    	document.querySelector("#current-1").textContent = "0";

    	document.querySelector(".player-0-panel").classList.toggle("active");
    	document.querySelector(".player-1-panel").classList.toggle("active");

    	document.querySelector(".dice").style.display = "none";
}