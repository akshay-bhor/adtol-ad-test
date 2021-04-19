import { randomId } from './util';

// create a random class
const idName = randomId(6);

// Get parent
const parent = document.currentScript.parentNode;

parent.innerHTML = `<div id="${idName}"></div>`;

// Get ad element
const ad_widget = document.getElementById(idName);
ad_widget.innerText = "Hello from text.js file";