var $answers = $(".answer");

if ($answers.length > 0) {
	var $ownerSelectedAnswer = $(".answer.accepted-answer");
	var hasOwnerSelectedAnswer = $ownerSelectedAnswer.length > 0;

	if (hasOwnerSelectedAnswer){
		HasOwnerSelected($answers, $ownerSelectedAnswer);
	} else {
		NoOwnerSelected($answers);
	}
}

function HasOwnerSelected ($answers, $ownerAnswer) {
	var answers = [];

	$answers.each(function () {
		var selected = $(this).hasClass("accepted-answer");
		answers.push({
			score: GetVoteCount($(this)),
			answer: $(this),
			ownerSelected: selected
		});
	});

	answers.sort(function (a, b) {
		return b.score - a.score;
	});

	//we know the default checkmark exists so replace it
	ReplaceDefaultCheckmark($ownerAnswer);

	// Check to see if the overall highest score is the owner selected answers
	if (answers[0].answer.hasClass("accepted-answer")) {
		//change the check to a person/check

		answers[0].answer.find(".votecell > .vote > .customIcon").removeClass("ownerSelect").addClass("communityownerSelect").attr("title", answers[0].answer.attr("title") + "Also this answer was voted the best by the community.");
	} else {
		var $topAnswer = answers[0].answer;
		$topAnswer.find(".votecell > .vote").append('<span class="customIcon communitySelect" title="This answer was voted the best by the community."></span>');

		var insertLocation = -1;
		for (var i = 0; i < answers.length; i++) {
			if (answers[i].ownerSelected === true){
				insertLocation = i;
				break;
			}
		}

		var $answerDiv = answers[insertLocation].answer;
		var $answerLink = $answerDiv.prev();

		$answerDiv.remove();
		$answerLink.remove();

		$(".answer").eq(insertLocation - 1).after($answerDiv);
		$(".answer").eq(insertLocation - 1).after($answerLink);
	}
}

function NoOwnerSelected ($answers) {
	// then they should be sorted already so grab the first and apply icon
	$answers.first().find(".votecell > .vote").append('<span class="customIcon communitySelect" title="This answer was voted the best by the community."></span>');
}

function ReplaceDefaultCheckmark($ownerAnswer) {
	var $oldCheck = $ownerAnswer.find(".votecell > .vote > .vote-accepted-on");
	var title = $oldCheck.attr("title");
	$oldCheck.remove();
	$ownerAnswer.find(".votecell > .vote").append('<span class="customIcon ownerSelect" title="' + title + '"></span>');
}

function GetVoteCount ($answer) {
	var stringNum = $answer.find(".votecell .vote [itemprop='upvoteCount']").text();

	return parseInt(stringNum, 10);
}