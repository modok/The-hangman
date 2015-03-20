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