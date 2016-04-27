var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var imageUrls = {};
imageUrls.check = data.url("images/check.png");
imageUrls.people = data.url("images/people.png");
imageUrls.peoplecheck = data.url("images/peoplecheck.png");

pageMod.PageMod({
	include: [
		"http://stackoverflow.com/questions/*",
		"https://stackoverflow.com/questions/*"
	],
	contentScriptFile: "./content.js",
	contentScriptOptions: imageUrls,
	contentStyleFile: "./style.css"
});