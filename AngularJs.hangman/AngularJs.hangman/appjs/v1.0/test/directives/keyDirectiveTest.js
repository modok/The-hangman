/// <reference path="../../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../../scripts/angular.min.js" />
/// <reference path="../../../../scripts/angular-mocks.js" />
/// <reference path="../../source/modules.js" />
/// <reference path="../../source/directives/keyDirective.js" />


describe('the key directive:', function () {
	var scope, compile, target;

	beforeEach(function () {
		module('hangman.directives');

		inject(function ($rootScope, $compile, $templateCache) {
			scope = $rootScope.$new();
			scope.mockInputManager = function () { };
			scope.value = "a";
			compile = $compile;
			var view = $templateCache.get('/appjs/v1.0/source/views/directives/keyDirective.html');
			if (!view) {
				$.ajax({
					url: '../../source/views/directives/keyDirective.html',
					async: false
				}).done(function (data) {
					$templateCache.put('/appjs/v1.0/source/views/directives/keyDirective.html', data);
				});
			}

			target = compile('<key value="value" input-manager="mockInputManager({key: key})"></key>')(scope);
			scope.$digest();

		});
	});

	it('should be possible print a letter', function () {
		expect(target.html()).toEqual("a");
	});

	it('should be possible click a letter', function () {
		spyOn(scope, 'mockInputManager');
		target.trigger('click');
		expect(scope.mockInputManager).toHaveBeenCalledWith({key: {id: '#k_a', value: 'a'}});
	});

});