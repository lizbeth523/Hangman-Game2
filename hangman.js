var inquirer = require('inquirer');
var numGuesses = 10;
// Number of letters in the word to be guessed
var numLetters = 0;
var Word = require("./Word.js");
var wordObject = new Word();

var callback = function(word, definition, example) {
 	console.log("word: " + word);
 	console.log("definition: " + definition);
 	console.log("example: " + example + "\n");

 	var letters = createLetters(word);
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


 


 var optionToPlayAgain = function() {
 	inquirer.prompt([
 		{
      		type: "confirm",
      		message: "Do you want to play again? ",
      		name: "playAgain"
    	}
 	]).then(function (answers) {

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
				if (value.match(/[A-Za-z]/)) {
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
 	console.log(displayString + "\n");
 	return displayString;
 }

 wordObject.getWord(callback);