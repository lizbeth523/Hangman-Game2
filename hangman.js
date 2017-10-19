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


 var playGame = function(letters) {
 	var inquirer = require('inquirer');

 	
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
    	// answers.guess = answers.guess.toUpperCase();
    	var containsGuess = false;
    	for (var i = 0; i < letters.length; i++) {
    		if (letters[i].value === answers.guess.toUpperCase()) {
    			letters[i].display = letters[i].value;
    			containsGuess = true;
    		}
    	}
    	
    	updateDisplay(containsGuess, letters);
	});
 	
 }


 var updateDisplay = function(containsGuess, letters) {
 	var displayString = "";

 	if (containsGuess) {
 		console.log("CORRECT!");
 	}
 	else {
 		console.log("INCORRECT :'\(");
 	}

 	for (i in letters) {
 		displayString += letters[i].display + " ";
 	}
 	console.log(displayString);
 }

 wordObject.getWord(callback);


