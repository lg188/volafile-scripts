// ==UserScript==
// @name        Volafile chat timestamps
// @namespace   volafile.improvements
// @description Adds timestamps to chat messages on Volafile.
// @match       http://volafile.io/r/*
// @include     http://volafile.io/r/*
// @version     3
// ==/UserScript==

/*
 *	@Author: unknown
 *	@Author: lg188
 *
 *	Changelog:
 *	Version 1:
 *		Basic script
 *	Version 2:
 *		Cleaned out the script
 *	Version 3:
 *		Fixed the duplication bug
 **/

console.debug("volafile-timestamps is running ");

var target = document.querySelector('#chat_messages');
var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {

		var valid = mutation.target.lastChild;
		var bla = valid.hasAttribute('timeAdded');

		if(bla == false ){
			addTimestamp();
			valid.setAttribute('timeAdded','true');
		}else{
			valid.setAttribute("timeAdded", 'false');
		}
	});
});

var config = {
	attributes: true,
	childList: true,
	characterData: true
};

var date, hours, minutes,seconds,finalTime;

function addTimestamp() {
	date = new Date();
	hours = date.getHours()
	minutes = date.getMinutes();
	seconds = date.getSeconds();
	if (seconds <= 9) {
		seconds = '0' + seconds;
	}
	if (minutes <= 9) {
		minutes = '0' + minutes
	}

	finalTime = hours + ':' + minutes + ':' + seconds;
	document.getElementsByClassName('username') [document.getElementsByClassName('username') .length - 1].innerHTML = finalTime + ' | ' + document.getElementsByClassName('username') [document.getElementsByClassName('username') .length - 1].innerHTML;

}

observer.observe(target, config);
