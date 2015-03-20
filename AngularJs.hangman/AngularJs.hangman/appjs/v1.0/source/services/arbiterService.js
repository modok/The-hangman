angular.module('hangman.services')
	.service('arbiterService', function () {
		var _word = null;
		var _discoveredWord = null;
		this.setWord = function (word) {
			_word = word;
			_discoveredWord = init();
		};

		this.getSecretWord = function () {
			return _discoveredWord;
		};

		this.try = function (letter, i) {
			var start = i || 0;
			var index = _word.indexOf(letter, start);
			if (index !== -1) {

				discoverNewLetter(letter, index);

				if (start <= _word.length) {
					this.try(letter, index + 1);
				}

				return 1;
			}

			return -1;
		};

		this.isGuessed = function () {
			return _discoveredWord === _word;
		};

		function init() {
			var ret = "";
			for (var i = 0, l = _word.length; i < l; i++) {
				if (_word[i] == " ") {
					ret += " ";
				} else {
					ret += "_";
				}
			}
			return ret;
		}

		function discoverNewLetter(letter, index) {
			var tempArray = _discoveredWord.split("");
			tempArray.splice(index, 1, letter);

			_discoveredWord = tempArray.join("");
		}
	});