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