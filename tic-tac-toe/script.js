const items = Array.from(document.querySelectorAll('.item'));
const winner = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
var firstPlayer = [];
var secondPlayer = [];
var count = 0;
console.log(items);
items.forEach(item => {
	item.addEventListener("click",aluHokiPlus);
});

function checkResult(array) {
   let finalResult = false;
   for (let item of winner){
   	  let res = item.every(val => array.indexOf(val) !== -1)
   	  if(res) {
   	  	finalResult = true;
   	  	break;
   	  }
   }
   return finalResult;
}

function rep(){
	const win= document.querySelector('.winner');

	firstPlayer =[];
	secondPlayer = [];
	win.remove();
    window.location.reload();
}

function winnerPlayer(message){
    const modal = document.createElement('div');
    const player = document.createElement("span");
    const replay = document.createElement('button');
    player.innerText = message;
    modal.appendChild(player);
    modal.classList.add("winner");
    modal.appendChild(player);
    replay.innerHTML = "Replay";
    replay.onclick = () => rep();
    modal.appendChild(replay);
    document.body.appendChild(modal);
    items.forEach(val => val.style["pointer-events"] = "none");
}

function aluHokiPlus(){
	if(this.classList == "item"){
	count++;
	if(count%2 !== 0){
		this.classList.add('x');
		firstPlayer.push(Number(this.getAttribute('data-index')));
		console.log("plus aayo");
		console.log(firstPlayer);
		if(checkResult(firstPlayer)){
			winnerPlayer("Congratulations! X wins");
 			}
	} else {
		this.classList.add('o');
		secondPlayer.push(Number(this.getAttribute('data-index')));
		console.log("alu aayo");
		console.log(secondPlayer);
		if(checkResult(secondPlayer)){
			winnerPlayer("Congratulations! O wins");
 			}
	}
	if(count === 9) {
		winnerPlayer("Draw");
	}
}
	
}
var app = document.getElementsByTagName('BODY')[0];
	  	if(localStorage.lightMode == "dark"){
	  		app.setAttribute("data-light-mode","dark");
	  	}

	  	function toggle_mode (){
	  		var app = document.getElementsByTagName('BODY')[0];
	  		var buttonText = document.getElementById("btn");
	  		if(localStorage.lightMode == "dark"){
	  			localStorage.lightMode = "light";
	  			app.setAttribute("data-light-mode","light");
	  			buttonText.innerHTML = "Dark Mode";
	  		} else {
	  			localStorage.lightMode = "dark";
	  			app.setAttribute("data-light-mode","dark");
	  			buttonText.innerHTML = "Light Mode";
	  		}
	  		console.log("lightMode = "+localStorage.lightMode);
	    }
