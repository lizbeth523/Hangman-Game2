var Word = function() {
	this.getWord = function(callback) {
		const ud = require('urban-dictionary');

		ud.random(function (error, entry) {
			if (error) {
		    	return error.message;		    	
		  	} else {
		    	callback(entry.word.toUpperCase());
		  	} 
		});
	};
};

module.exports = Word;




