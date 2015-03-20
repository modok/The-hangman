/// <reference path="../../../../scripts/jquery-2.1.3.min.js" />
/// <reference path="../../../../scripts/jasmine/jasmine.js" />
/// <reference path="../../../../scripts/angular.min.js" />
/// <reference path="../../../../scripts/angular-mocks.js" />
/// <reference path="../../source/modules.js" />
/// <reference path="../../source/services/arbiterService.js" />

describe('the arbiterService: ', function() {
	var target;
	beforeEach(function() {
		module('hangman.services');
		inject(function($injector) {
			target = $injector.get('arbiterService');
		});
		target.setWord("myword");
	});

	it('should be possible to get a word encrypted', function () {
		expect(target.getSecretWord()).toEqual("______");
	});

	it('should be possible to get a sentence encrypted', function () {
		target.setWord("my sentence");
		expect(target.getSecretWord()).toEqual("__ ________");

		target.setWord("my sentence more complicated");
		expect(target.getSecretWord()).toEqual("__ ________ ____ ___________");
	});

	it('should be possible guess a letter', function () {
		target.try("m");
		expect(target.getSecretWord()).toEqual("m_____");
		target.try("d");
		expect(target.getSecretWord()).toEqual("m____d");
		target.try("q");
		expect(target.getSecretWord()).toEqual("m____d");
	});

	it("should be possible pick a letter existing multiple times in the word", function() {
		target.setWord("mymyword");
		target.try("m");
		expect(target.getSecretWord()).toEqual("m_m_____");

		target.setWord("mymyworm");
		target.try("m");
		expect(target.getSecretWord()).toEqual("m_m____m");

	});

	it("should be possible pick a letter existing multiple times in a sentence", function () {
		target.setWord("my myword");
		target.try("m");
		expect(target.getSecretWord()).toEqual("m_ m_____");

		target.setWord("my my worm");
		target.try("m");
		expect(target.getSecretWord()).toEqual("m_ m_ ___m");

	});

	it("the try should notify if a letter is not found at least once", function () {
		target.setWord("my myword");
		
		expect(target.try("k")).toEqual(-1);
	});

	it("the try should notify if a letter is found at least once", function () {
		target.setWord("my myword");

		expect(target.try("m")).toEqual(1);
	});

	it("should be possible to know if the sentence has been discovered", function () {
		target.setWord("my my");

		expect(target.isGuessed()).toEqual(false);
		target.try("m");
		expect(target.isGuessed()).toEqual(false);
		target.try("y");
		expect(target.isGuessed()).toEqual(true);
	});
});