/// <reference path="../../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../../scripts/angular.js" />
/// <reference path="../../../../scripts/angular-mocks.js" />
/// <reference path="../../source/modules.js" />
/// <reference path="../../source/controllers/mainCtrl.js" />

describe('the mainCtrl:', function () {
	var target, scope, mockArbiter, spyOnArbiterTry,
		spyOnArbiterGetSecretWord, spyOnArbiterSetWord,
		spyOnArbiterisGuessed, elementMock;

	mockArbiter = {
		try: function () {

		},
		isGuessed: function () { },
		setWord: function () { },
		getSecretWord: function () { }
	};

	elementMock = {
		find: function () {
			return {
				prop: function () { }
			};
		}
	};

	beforeEach(function () {
		module('hangman.controllers');
		inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();

			spyOnArbiterTry = spyOn(mockArbiter, 'try');
			spyOnArbiterGetSecretWord = spyOn(mockArbiter, 'getSecretWord');
			spyOnArbiterisGuessed = spyOn(mockArbiter, 'isGuessed');
			spyOnArbiterSetWord = spyOn(mockArbiter, 'setWord');

			target = $controller('mainCtrl', { '$scope': scope, 'arbiterService': mockArbiter, '$element': elementMock });
		});
	});

	it('should have an input manager', function () {
		expect(scope.inputManager).toBeDefined();
	});

	it('should use the arbiter', function () {
		scope.inputManager({ value: 'a' });

		expect(mockArbiter.getSecretWord).toHaveBeenCalled();
		expect(mockArbiter.try).toHaveBeenCalledWith("a");
	});

	it('should track the errors', function () {
		spyOnArbiterTry.and.returnValue(-1);
		expect(scope.errors).toEqual(0);
		scope.inputManager({ value: 'a' });
		expect(scope.errors).toEqual(1);
	});

	it('should call the gameover if you make more than 4 errors', function () {
		spyOnArbiterTry.and.returnValue(-1);

		expect(scope.gameOver).toBe(false);
		expect(scope.errors).toEqual(0);
		scope.inputManager({ value: 'a' });
		expect(scope.errors).toEqual(1);
		scope.inputManager({ value: 'a' });
		expect(scope.errors).toEqual(2);
		scope.inputManager({ value: 'a' });
		expect(scope.errors).toEqual(3);
		scope.inputManager({ value: 'a' });
		expect(scope.errors).toEqual(4);
		scope.inputManager({ value: 'a' });
		expect(scope.errors).toEqual(5);
		expect(scope.gameOver).toBe(true);
		expect(scope.message).toEqual('YOU LOSE');
	});

	it('should call the gameover if you guess the word', function () {
		spyOnArbiterisGuessed.and.returnValue(false);

		expect(scope.gameOver).toBe(false);
		scope.inputManager({ value: 'a' });
		spyOnArbiterisGuessed.and.returnValue(true);
		scope.inputManager({ value: 'a' });
		expect(scope.gameOver).toBe(true);
		expect(scope.message).toEqual('YOU WIN');
		expect(mockArbiter.isGuessed).toHaveBeenCalled();
	});


});