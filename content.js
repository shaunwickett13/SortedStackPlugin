debugger;

var answers = document.getElementsByClassName("answer");

if (answers.length > 0) {
	var ownerSelectedAnswer = document.getElementsByClassName("answer accepted-answer");
	var hasOwnerSelectedAnswer = ownerSelectedAnswer.length > 0;

	if (hasOwnerSelectedAnswer){
		HasOwnerSelected(answers, ownerSelectedAnswer[0]);
	} else {
		NoOwnerSelected(answers[0]);
	}
}

function HasOwnerSelected (answerElems, ownerAnswerElem) {
	var answers = [];

	for (var i = 0; i < answerElems.length; i++){
		var answer = answerElems[i];
		var selected = answer.className.indexOf("accepted-answer") >= 0;
		answers.push({
			score: GetVoteCount(answer),
			answer: answer,
			ownerSelected: selected
		});
	}

	answers.sort(function (a, b) {
		return b.score - a.score;
	});


	//we know the default checkmark exists so replace it
	ReplaceDefaultCheckmark(ownerAnswerElem);

	// Check to see if the overall highest score is the owner selected answers
	if (answers[0].answer.className.indexOf("accepted-answer") >= 0) {
		//change the check to a person/check

		var iconElem = answers[0].answer.querySelector(".votecell > .vote > .customIcon");
		iconElem.className = "customIcon communityownerSelect";
		iconElem.title = iconElem.title + "This answer was also voted best by the community";
	} else {
		var topAnswer = answers[0].answer;
		var topAnswerVote = topAnswer.querySelector(".votecell > .vote");
		
		var iconSpan = document.createElement("span");
		iconSpan.className = "customIcon communitySelect";
		iconSpan.title = "This answer was voted the best by the community.";

		topAnswerVote.appendChild(iconSpan);

		var insertLocation = -1;
		for (var i = 0; i < answers.length; i++) {
			if (answers[i].ownerSelected === true){
				insertLocation = i;
				break;
			}
		}

		var answerDiv = answers[insertLocation].answer;
		var answerLink = answerDiv.previousSibling;

		var insertAfterElem = answers[insertLocation - 1].answer;

		insertAfterElem.parentNode.insertBefore(answerDiv, insertAfterElem.nextSibling);		
		insertAfterElem.parentNode.insertBefore(answerLink, insertAfterElem.nextSibling);
	}
}

function NoOwnerSelected (answer) {
	// then they should be sorted already so grab the first and apply icon
	var topAnswerVote = answer.querySelector(".votecell > .vote");

	var iconSpan = document.createElement("span");
	iconSpan.className = "customIcon communitySelect";
	iconSpan.title = "This answer was voted the best by the community.";

	topAnswerVote.appendChild(iconSpan);
}

function ReplaceDefaultCheckmark(ownerAnswerElem) {
	var oldCheck = ownerAnswerElem.querySelector(".votecell > .vote > .vote-accepted-on");
	var title = oldCheck.title;
	
	var oldCheckParent = oldCheck.parentNode;
	oldCheckParent.removeChild(oldCheck);

	var voteElem = ownerAnswerElem.querySelector(".votecell > .vote")

	var newCheck = document.createElement("span");
	newCheck.title = title;
	newCheck.className = "customIcon ownerSelect";

	voteElem.appendChild(newCheck);
}

function GetVoteCount (answer){
	var stringNum = answer.querySelector(".votecell .vote [itemprop='upvoteCount'").textContent;

	return parseInt(stringNum, 10);
}