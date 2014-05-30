// ==UserScript==
// @name        Volacoins 2
// @namespace   vola.coins
// @description Click the logo, get money cash volacoins.
// @match       *://volafile.io/r/*
// @include     *://volafile.io/r/*
// @version     1
// @grant       none
// ==/UserScript==

function load(key) { // Easier to type.
	return JSON.parse(localStorage.getItem(key))
}

if(load('volacoinKey') === undefined || load('volacoinKey') === null) {
    var volacoins = 0;
    localStorage.setItem('volacoinKey', JSON.stringify(volacoins));
    console.log('ey');
} else {
    var volacoins = localStorage.getItem('volacoinKey');
    console.log('yo');
}

var volacoinHeaderElement = document.createElement('SPAN');
var volacoinHeaderElementText = document.createTextNode('Volacoin');
volacoinHeaderElement.appendChild(volacoinHeaderElementText);
volacoinHeaderElement.setAttribute('class', 'header_row_element');
//Creating the header element here.


var header1 = document.getElementById('header_row1');
header1.appendChild(volacoinHeaderElement);



var volacoinMenu = document.createElement('DIV');
var volacoinMenuText = document.createTextNode('test');
volacoinMenu.setAttribute('class', 'ui_frame');
volacoinMenu.setAttribute('style', 'width: 410px; height: 250px; display: none; margin-left: auto; margin-right: auto; position: relative; top: 106px;');
volacoinMenu.setAttribute('id', 'volacoin_menu');
document.body.appendChild(volacoinMenu);
//Creating the Volacoin menu here

var showMenuCounter = 0;
var volacoinMenuId = document.getElementById('volacoin_menu');

volacoinMenuConfig = 'width: 410px; height: 250px; margin-left: auto; margin-right: auto; position: relative; top: 106px;';
//Useful for when i hide/show the menu

function showMenu() {
    showMenuCounter++;
    
    if(showMenuCounter === 1) {
        volacoinMenuId.setAttribute('style', volacoinMenuConfig+'display: block;');
    }
    
    if(showMenuCounter === 2) {
        volacoinMenuId.setAttribute('style', volacoinMenuConfig+'display: none;');
        showMenuCounter = 0;
    }
}

function increment() {
    volacoins++;
    volacoinAmount.innerHTML='Volacoins: '+volacoins;
    localStorage.setItem('volacoinKey', volacoins);
}

volacoinHeaderElement.addEventListener('click', showMenu, false);

var clickable = document.createElement('IMG');
clickable.setAttribute('src', 'http://volafile.io/static/logo_mid.png');
clickable.setAttribute('style', 'margin-left: auto; margin-right: auto; display: block; margin-top: 60px;');
volacoinMenu.appendChild(clickable);

clickable.addEventListener('click', increment, false);


var volacoinAmount = document.createElement('P');
var volacoinAmountText = document.createTextNode('Volacoins: '+volacoins);
volacoinAmount.setAttribute('style', 'position: absolute; bottom: 0;')
volacoinAmount.appendChild(volacoinAmountText);

volacoinMenu.appendChild(volacoinAmount);
