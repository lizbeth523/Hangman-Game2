var Letter = function(value) {
	this.value = value;

	if (this.value.match(/[A-Za-z]/)) {
		this.display = "_";
	}
	else if (this.value.match(/\s/)) {
		this.display = " ";
	}
	else {
		this.display = value;
	}
}

module.exports = Letter;