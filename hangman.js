var Word = require("./Word.js");

var wordObject = new Word();

var callback = function(word, definition, example) {
 	console.log("word: " + word);
 	console.log("definition: " + definition);
 	console.log("example: " + example);
 	console.log("callback fxn is running");

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
 	
	inquirer.prompt([/* Pass your questions in here */
	]).then(function (answers) {
    // Use user feedback for... whatever!!
	});
 }


 wordObject.getWord(callback);


