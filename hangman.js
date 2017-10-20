var inquirer = require('inquirer');
var lettersGuessed;
var numGuesses;
var wordMeaning;

var callback = function(word, definition) {
 	var letters = createLetters(word);
 	wordMeaning = definition;
 	
 	playGame(letters);
 }


 var createLetters = function(word) {
 	var Letter = require("./Letter.js");
 	var letters = [];

 	for (var i = 0; i < word.length; i++) {
 		letters[i] = new Letter(word.charAt(i));
 	}
 	return letters;
 }


var createWord = function() {
	var Word = require("./Word.js");
	var wordObject = new Word();

	wordObject.getWord(callback);
 } 


 var optionToPlayAgain = function() {
 	inquirer.prompt([
 		{
      		type: "confirm",
      		message: "Do you want to play again? ",
      		name: "playAgain"
    	}
 	]).then(function (answers) {
 		if (answers.playAgain) {
 			startGame();
 		}
 		else {
 			console.log("Goodbye!");
 		}
 	});
 }


 var playGame = function(letters) {
 	if (numGuesses > 0) {
		inquirer.prompt([
		{
			type: "input",
			message: "Guess a letter! ",
			name: "guess",
			validate: function(value) {
				if (value.length > 1) {
					return "Please enter only 1 letter";
				}
				else if (lettersGuessed.includes(value.toUpperCase())) {
					return "You have already guessed this letter";
				}
				else if (value.match(/[A-Za-z]/)) {
					return true;
				}
				else {
					return "Please guess a letter";
				}
			}
		}
		]).then(function (answers) {
			var containsGuess = false;
			var displayString;

			lettersGuessed.push(answers.guess.toUpperCase());
			lettersGuessed.sort();

			for (var i = 0; i < letters.length; i++) {
				if (letters[i].value === answers.guess.toUpperCase()) {
					letters[i].display = letters[i].value;
					containsGuess = true;
				}
			}

			if (!containsGuess) {
				numGuesses--;
			}

			displayString = updateDisplay(containsGuess, letters);
			if (!displayString.match(/_/)) {
				console.log("You won!");
				console.log("Definition: " + wordMeaning);
				optionToPlayAgain();
			}
			else {
				playGame(letters);
			}	
		});
 	}
 	else {
 		console.log("Game Over!");
 		optionToPlayAgain();
 	}
 }


 var startGame = function() {
 	lettersGuessed = [];
	numGuesses = 10;
	createWord();
 }


 var updateDisplay = function(containsGuess, letters) {
 	var displayString = ""; 

 	if (containsGuess) {
 		console.log("\nCORRECT!\n");
 	}
 	else {
 		console.log("\nINCORRECT :'\(");
 		if (numGuesses !== 1) {
 			console.log(numGuesses + " guesses remaining\n");
 		}
 		else {
 			console.log(numGuesses + " guess remaining\n");
 		}
 	}

 	for (i in letters) {
 		displayString += letters[i].display + " ";
 	}
 	displayString += "\nLetters Used: " + lettersGuessed.join(", ");
 	console.log(displayString + "\n");
 	return displayString;
 }

 startGame();