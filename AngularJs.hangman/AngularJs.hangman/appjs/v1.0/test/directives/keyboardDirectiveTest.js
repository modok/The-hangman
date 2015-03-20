/// <reference path="../../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../../scripts/angular.min.js" />
/// <reference path="../../../../scripts/angular-mocks.js" />
/// <reference path="../../source/modules.js" />
/// <reference path="../../source/directives/keyboardDirective.js" />


describe('the keyboard directive:', function () {
	var scope, compile, target;

	beforeEach(function () {
		module('hangman.directives');

		inject(function ($rootScope, $compile, $templateCache) {
			scope = $rootScope.$new();
			scope.mockInputManager = function() {};
			compile = $compile;
			var view = $templateCache.get('/appjs/v1.0/source/views/directives/keyboardDirective.html');
			if (!view) {
				$.ajax({
					url: '../../source/views/directives/keyboardDirective.html',
					async: false
				}).done(function (data) {
					$templateCache.put('/appjs/v1.0/source/views/directives/keyboardDirective.html', data);
				});
			}

			target = compile('<keyboard input-manager="mockInputManager"></keyboard>')(scope);
			scope.$digest();


		});
	});

	it('should be possible get a keyboard', function () {
		var targetScope = target.isolateScope();
		var keys = target.find('key');

		expect(keys.length).toEqual(26);
		expect(targetScope.keys[0]).toEqual("q");
		expect(targetScope.keys[1]).toEqual("w");
		expect(targetScope.keys[2]).toEqual("e");
		expect(targetScope.keys[3]).toEqual("r");
		expect(targetScope.keys[4]).toEqual("t");
		expect(targetScope.keys[5]).toEqual("y");
		expect(targetScope.keys[6]).toEqual("u");
		expect(targetScope.keys[7]).toEqual("i");
		expect(targetScope.keys[8]).toEqual("o");
		expect(targetScope.keys[9]).toEqual("p");
		expect(targetScope.keys[10]).toEqual("a");
		expect(targetScope.keys[11]).toEqual("s");
		expect(targetScope.keys[12]).toEqual("d");
		expect(targetScope.keys[13]).toEqual("f");
		expect(targetScope.keys[14]).toEqual("g");
		expect(targetScope.keys[15]).toEqual("h");
		expect(targetScope.keys[16]).toEqual("j");
		expect(targetScope.keys[17]).toEqual("k");
		expect(targetScope.keys[18]).toEqual("l");
		expect(targetScope.keys[19]).toEqual("z");
		expect(targetScope.keys[20]).toEqual("x");
		expect(targetScope.keys[21]).toEqual("c");
		expect(targetScope.keys[22]).toEqual("v");
		expect(targetScope.keys[23]).toEqual("b");
		expect(targetScope.keys[24]).toEqual("n");
		expect(targetScope.keys[25]).toEqual("m");
	});

	it('should pass the inputManager to every key', function () {
		var keys = target.find('key');

		expect($(keys[0]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[1]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[2]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[3]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[4]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[5]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[6]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[7]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[8]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[9]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[11]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[12]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[13]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[14]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[15]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[16]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[17]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[18]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[19]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[20]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[21]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[22]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[23]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[24]).attr('input-manager')).toEqual("inputManager");
		expect($(keys[25]).attr('input-manager')).toEqual("inputManager");
	});
});