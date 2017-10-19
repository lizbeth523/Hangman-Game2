var Letter = function(value) {
	this.value = value;
	this.hidden = true;

	// Display a blank space for any whitespace character
	if (this.value.match(/\s/)) {
		this.display = " ";
	}
	// If the letter has not yet been guessed, display an underscore
	else if (this.value.match(/[A-Za-z]/) && this.hidden) {
		this.display = "_";
	}
	// If the letter has been guessed or if the character is not a letter, display the value
	else {
		this.display = value;
	}
}

module.exports = Letter;