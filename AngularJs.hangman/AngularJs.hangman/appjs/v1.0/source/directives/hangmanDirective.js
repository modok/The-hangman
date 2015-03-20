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