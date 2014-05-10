// ==UserScript==
// @name        Volafile chat timestamps
// @namespace   niggerdong.penis
// @description Adds timestamps to chat messages on Volafile.
// @match       *://volafile.io/*
// @include     *://volafile.io/*
// @version     1
// ==/UserScript==
var target = document.querySelector('#chat_messages');
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    addTimestamp();
  });
});
var config = {
  attributes: true,
  childList: true,
  characterData: true
};
var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var finalTime = hours + ':' + minutes + ':' + seconds;
function addTimestamp() {
  date = new Date();
  hours = date.getHours();
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
  thisfunctiondoesnotexist();
  //CTRL+F thisfunctiondoesnotexist    1 result (excluding this comment)
}
observer.observe(target, config);
