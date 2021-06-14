//question
//answers
//correct/incorrect
(function(){
	var Question = function(question,answers,correct){
     this.question = question;
     this.answers = answers;
     this.correctAns = correct;
	}
	Question.prototype.displayQuestion = function(){
        console.log(this.question);
        for(let i=0; i< this.answers.length;i++){
        	console.log(i + ": "+this.answers[i]);
        }   
	};
	Question.prototype.checkAnswer = function(ans,fn,playerScore){
		if(ans !== "exit"){
			if(ans === this.correctAns){
				console.log("Correct Answer!");
				playerScore(true);
				fn();
			} else {
				console.log("Incorrect Answer!");
				playerScore(false);
				fn();
			}
		} else {
			console.log("%c Game Over!","color:royalblue;font-size:3em;font-family:monospace;text-align:center;");
			playerScore(false);
		}	
	};
	Question.prototype.displayScore = function(){
		var sc = 0;
		return function(ans){
			if(ans){
				sc++;
				console.log("%c Your score is "+ sc,"color:green;");
				console.log("============================================");
			} else {
				console.log("%c Your score is "+ sc,"color:green;");
				console.log("============================================");
			}
		};

	};

	
	const question1 = new Question("What is the name of your country?",["Nepal","China","America"],"0");
	const question2 = new Question("Who is the prime minister of Nepal?",["Sher Bdr Deuba",'Pushpa Kamal Dahal',
		"Khadka Prasad Oli"],"2");
	const question3 = new Question("What is the national bird of Nepal?",["Lhopophorous","Danfe","Kade Vyakur"],
		"0");
	const question4 = new Question("How many colours are there in a national flag of China?",["One","Two","Five"],
		"1");
	const question5 = new Question("What is the height of the tallest mountain Mt.Everest?",["8843m","8865m",
		"8848m"],
		"2");
	const allQuestions = [question1,question2,question3,question4,question5];
	// Question.prototype.randomQuestion = function(){
	// 	var indexRandom = Math.floor(Math.random() * 5);
	// 	console.log(allQuestions[indexRandom].question); 
	// 	for(let i = 0;i<allQuestions[indexRandom].answers.length;i++){
	// 		console.log(i + " : " + allQuestions[indexRandom].answers[i]);
	// 	}
	// 	var correctAns = prompt("Please select the correct answer in number!");
	// 	if(correctAns === allQuestions[indexRandom].correctAns){
	// 		console.log("Correct Answer!");
	// 	} else {
	// 		console.log("Incorrect Answer!");
	// 	}
	// }
	// Question.prototype.randomQuestion();
	var playerScore = Question.prototype.displayScore();
	function nextQuestion(){
		var n = Math.floor(Math.random() * 5);
		allQuestions[n].displayQuestion();
		let userAns= prompt("Please select the correct answer in number or enter \"exit\" to quit the game");
		allQuestions[n].checkAnswer(userAns,nextQuestion,playerScore);
	}
   nextQuestion();	

})();




// console.log(question1.question);
// for(let i = 0;i<question1.answers.length;i++)
// {
// 	console.log(i + ":"+ question1.answers[i]);
// }
// var correctAns = prompt("Enter the correct answer.");
// console.log(correctAns);
// if(correctAns === question1.correctAns){
// 	console.log("Correct Answer");
// } else {
// 	console.log("Answer is incorrect");
// }