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