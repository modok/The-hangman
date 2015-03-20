/// <reference path="../../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../../scripts/angular.min.js" />
/// <reference path="../../../../scripts/angular-mocks.js" />
/// <reference path="../../source/modules.js" />
/// <reference path="../../source/directives/hangmanDirective.js" />

describe('the hangman directive:', function () {
	var scope, compile, target;

	beforeEach(function () {
		module('hangman.directives');

		inject(function ($rootScope, $compile, $templateCache) {
			scope = $rootScope.$new();
			scope.word = '__ ___';
			scope.errors = 2;
			compile = $compile;
			var view = $templateCache.get('/appjs/v1.0/source/views/directives/hangmanDirective.html');
			if (!view) {
				$.ajax({
					url: '../../source/views/directives/hangmanDirective.html',
					async: false
				}).done(function (data) {
					$templateCache.put('/appjs/v1.0/source/views/directives/hangmanDirective.html', data);
				});
			}
			target = compile('<hangman word="word" errors="errors"></hangman>')(scope);
			scope.$digest();
		});
	});

	it('should be possible render a word', function () {
		var word = target.find('.word pre').html();
		expect(word).toEqual('_ _   _ _ _');
	}); 

	it('should be possible render the hangman', function () {
		expect(target.find('.puppet').html()).toContain("2");
		expect(target.hasClass('l_2')).toBe(true);
	});

});