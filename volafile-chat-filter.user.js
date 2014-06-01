// ==UserScript==
// @name        Volafile chat filter
// @namespace   keystrokes.se
// @description Is someone shitposting in chat? Block them with this script
// @match       *://volafile.io/*
// @include     *://volafile.io/*
// @version     6
// @author      Dongmaster
// @author      cyberia
// ==/UserScript==

//Edit the variables below to your liking!
var filtered = []; //This is the blacklist for registered users AND unregistered users. Use this if you don't want to block all unregistered users! The format for filtering users: /username/i    if you want to filter several users: /user1/i, /user2/i
var unregisteredWhitelist = []; //(Variable below must be enabled for this) This is the whitelist for unregistered users. The format for whitelisting users is; /username/i     If you want several users: /user1/i, /user2/i
var filterUnregistered = false; //Change to true if you want to filter ALL unregistered users (users in the whitelist are not filtered when this is enabled).
//Edit the variables above to your liking!

function id(selector) {
    return document.getElementById(selector);
}

var textfieldSpan = document.createElement('SPAN');
textfieldSpan.setAttribute('id', 'chat_filter_span');
textfieldSpan.setAttribute('class', 'header_row_element');

id('header_row2').appendChild(textfieldSpan);

var textfield = document.createElement('INPUT');
textfield.setAttribute('id', 'filter_input');
textfield.setAttribute('type', 'text');
textfield.style.backgroundColor = '#264559';
textfield.style.height = '1.2em';
textfield.style.verticalAlign = 'bottom';
textfield.setAttribute('placeholder', 'Add user to filter');
textfield.style.width = '145px';
textfield.setAttribute('autocomplete', 'off');

textfieldSpan.appendChild(textfield);

var tempSpecUser;
var user;

textfield.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
       tempUser = id('filter_input').value;
       user = new RegExp(tempUser, 'i');
        
       filtered.push(user);
       
       id('filter_input').value = '';
    }
}, false);

var observer = new MutationObserver(function(mutations){
	mutations.forEach(function(mutation){
	
		for(j = 0; j < mutation.addedNodes.length; j++){
			nameNode = mutation.addedNodes[j].getElementsByClassName('username')[0];

			for(i = 0; i < filtered.length; i++){
				if(filtered[i].test(nameNode.innerHTML.slice(0, -1))) {
					nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
				}
				//console.log(mutation.addedNodes[j].getElementsByClassName('username')[0].innerHTML);
			}
            
            if(unregisteredWhitelist.length === 0) {
                for(k = 0; k < unregisteredWhitelist.length+1; k++) {
            		if(filterUnregistered === true && nameNode.hasAttribute('href') === false && !/messagelog/i.test(nameNode.innerHTML) && !/room/i.test(nameNode.innerHTML) && !/system/i.test(nameNode.innerHTML) && !/network/i.test(nameNode.innerHTML) && !/motd/i.test(nameNode.innerHTML)) {
						nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
					}
            	}
            } else {
                for(x = 0; x < unregisteredWhitelist.length; x++) {
            		if(filterUnregistered === true && nameNode.hasAttribute('href') === false && !/messagelog/i.test(nameNode.innerHTML) && !/room/i.test(nameNode.innerHTML) && !/system/i.test(nameNode.innerHTML) && !/network/i.test(nameNode.innerHTML) && !/motd/i.test(nameNode.innerHTML) && !unregisteredWhitelist[x].test(nameNode.innerHTML)) {
						nameNode.parentNode.parentNode.removeChild(nameNode.parentNode);
					}
            	}
            }
		}
	});
});



observer.observe(document.querySelector('#chat_messages'), {childList: true});