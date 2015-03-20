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