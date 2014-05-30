// ==UserScript==
// @name        Volafile chat filter
// @namespace   keystrokes.se
// @description Is someone shitposting in chat? Block them with this script!
// @match       *://volafile.io/*
// @include     *://volafile.io/*
// @version     5
// @author      Dongmaster
// @author      cyberia
// ==/UserScript==



//Edit the variables below to your liking!
var filtered = []; //This is the blacklist for registered users AND unregistered users. Use this if you don't want to block all unregistered users! The format for filtering users: /username/i    if you want to filter several users: /user1/i, /user2/i
var unregisteredWhitelist = []; //(Variable below must be enabled for this) This is the whitelist for unregistered users. The format for whitelisting users is; /username/i     If you want several users: /user1/i, /user2/i
var filterUnregistered = false; //Change to true if you want to filter ALL unregistered users (users in the whitelist are not filtered when this is enabled).
//Edit the variables above to your liking!

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
			console.log(unregisteredWhitelist.length);
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