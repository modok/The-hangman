///#source 1 1 /appjs/v1.0/source/modules.js
angular.module('hangman.directives', []);
angular.module('hangman.controllers', []);
angular.module('hangman.services', []);
angular.module('hangman', [
'hangman.services',
'hangman.directives',
'hangman.controllers'
]).constant('wordToGuess', 'my angularjs hangman implementation')
	.constant('keymapping', {
		"113": "q",
		"119": "w",
		"101": "e",
		"114": "r",
		"116": "t",
		"121": "y",
		"117": "u",
		"105": "i",
		"111": "o",
		"112": "p",
		"97": "a",
		"115": "s",
		"100": "d",
		"102": "f",
		"103": "g",
		"104": "h",
		"106": "j",
		"107": "k",
		"108": "l",
		"122": "z",
		"120": "x",
		"99": "c",
		"118": "v",
		"98": "b",
		"110": "n",
		"109": "m"
	}).run(['$document', 'keymapping', 'arbiterService', 'wordToGuess'
		, function ($document, keymapping, arbiterService, wordToGuess) {
			arbiterService.setWord(wordToGuess);
			$document.keypress(function (e) {
				var button = $('#k_' + keymapping[e.charCode]);
				if (!button.prop('disabled')) {
					$('#k_' + keymapping[e.charCode]).trigger('click');
				}
			});
		}]);
///#source 1 1 /appjs/v1.0/source/directives/keyboardDirective.js
angular.module('hangman.directives')
.directive('keyboard', [function() {
	return {
		restrict:'E',
		replace: true,
		scope: {
			inputManager: '&'
		},
		templateUrl: '/appjs/v1.0/source/views/directives/keyboardDirective.html',
		link: function ($scope) {
			$scope.keys = [
				"q",
				"w",
				"e",
				"r",
				"t",
				"y",
				"u",
				"i",
				"o",
				"p",
				"a",
				"s",
				"d",
				"f",
				"g",
				"h",
				"j",
				"k",
				"l",
				"z",
				"x",
				"c",
				"v",
				"b",
				"n",
				"m"
			];
		}
	};
}]);
///#source 1 1 /appjs/v1.0/source/directives/keyDirective.js
angular.module('hangman.directives')
.directive('key', [function() {
	return {
		restrict:'E',
		replace: true,
		scope: {
			value: '=',
			inputManager: '&'
		},
		templateUrl: '/appjs/v1.0/source/views/directives/keyDirective.html'
	};
}]);
///#source 1 1 /appjs/v1.0/source/directives/hangmanDirective.js
angular.module('hangman.directives')
.directive('hangman', [function () {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			word: '=',
			errors: '='
		},
		templateUrl: '/appjs/v1.0/source/views/directives/hangmanDirective.html',
		link: function($scope) {
			$scope.beautify = function(word) {
				var t = word.split('');
				return t.join(' ');
			};
		}
	};
}]);
///#source 1 1 /appjs/v1.0/source/services/arbiterService.js
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
///#source 1 1 /appjs/v1.0/source/controllers/mainCtrl.js
angular.module('hangman.controllers')
	.controller('mainCtrl', ['$scope', 'arbiterService', '$element'
		, function ($scope, arbiterService, $element) {
			$scope.word = arbiterService.getSecretWord();
			$scope.gameOver = false;
			$scope.message = "";
			$scope.errors = 0;
			$scope.inputManager = function (key) {
				var result = arbiterService.try(key.value);
				$element.find(key.id).prop('disabled', true);

				if (result === -1) {
					$scope.errors++;

					if ($scope.errors > 4) {
						$scope.gameOver = true;
						$scope.message = "YOU LOSE";
						$element.find('button').prop('disabled', true);
					}
				} else {
					if (arbiterService.isGuessed()) {
						$scope.gameOver = true;
						$scope.message = "YOU WIN";
						$element.find('button').prop('disabled', true);
					}
				}

				$scope.word = arbiterService.getSecretWord();
			};
		}]);
