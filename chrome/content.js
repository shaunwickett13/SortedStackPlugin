classes = {
	answer: "answer",
	acceptedAnswer: "accepted-answer",
	me_icon: "customIcon",
	me_owner: "ownerSelect",
	me_community: "communitySelect",
	me_ownercommunity: "communityownerSelect"
};

selectors = {
	customIcon: ".votecell > .vote > .customIcon",
	voteDiv: ".votecell > .vote",
	oldIcon: ".votecell > .vote > .vote-accepted-on",
	answerScore: ".votecell .vote [itemprop='upvoteCount'"
};

titles = {
	owner: "This answer was selected as the best by the asker of the question.",
	community: "This answer was voted as the best by the community.",
	ownercommunity: "This answer was selected as the best by the asker of the question, as well as being voted the best answer by the community."
};

var answers = document.getElementsByClassName(classes.answer);

if (answers.length > 0) {
	var ownerSelectedAnswer = document.getElementsByClassName(classes.answer + " " + classes.acceptedAnswer);
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
		var selected = answer.className.indexOf(classes.acceptedAnswer) >= 0;
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
	if (answers[0].answer.className.indexOf(classes.acceptedAnswer) >= 0) {
		//change the check to a person/check

		var iconElem = answers[0].answer.querySelector(selectors.customIcon);
		iconElem.className = classes.me_icon + " " + classes.me_ownercommunity;
		iconElem.title = titles.ownercommunity;
	} else {
		var topAnswer = answers[0].answer;
		var topAnswerVote = topAnswer.querySelector(selectors.voteDiv);
		
		var iconSpan = document.createElement("span");
		iconSpan.className = classes.me_icon + " " + classes.me_community;
		iconSpan.title = titles.community;

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
	var topAnswerVote = answer.querySelector(selectors.voteDiv);

	var iconSpan = document.createElement("span");
	iconSpan.className = classes.me_icon + " " + classes.me_community;
	iconSpan.title = titles.community;

	topAnswerVote.appendChild(iconSpan);
}

function ReplaceDefaultCheckmark(ownerAnswerElem) {
	var oldCheck = ownerAnswerElem.querySelector(selectors.oldIcon);
	var title = oldCheck.title;
	
	var oldCheckParent = oldCheck.parentNode;
	oldCheckParent.removeChild(oldCheck);

	var voteElem = ownerAnswerElem.querySelector(selectors.voteDiv)

	var newCheck = document.createElement("span");
	newCheck.title = title;
	newCheck.className = classes.me_icon + " " + classes.me_owner;

	voteElem.appendChild(newCheck);
}

function GetVoteCount (answer){
	var stringNum = answer.querySelector(selectors.answerScore).textContent;

	return parseInt(stringNum, 10);
}
