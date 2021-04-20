import fetchAd from './fetch';
import randomId from './util';

// create a random class
const idName = randomId(6);

// Get parent
const currScript = document.currentScript;
const parent = currScript.parentNode;

// Get token
const token = currScript.getAttribute("id") || '3f10d40d47ed2e4cac61f56597a91c7849d359b5017a4d5fbd9910289c1f76f09adecf751e7ab0a5872faffad2f8a2608fc871efdad96729b534c1757b0a7c957a69b010fab6fcf4e464ac87932cdcfb58e16659ba215aa1ea2c58a4b70203593b58112a472390fb4a5942206196165c64bc933d90-5c6aaf65494ab246-3a23a7c28c3c48e754ff455caa1bb8ac7605c48f32aeea406a67075fe812502a';

parent.innerHTML = `<div id="${idName}"></div>`;

// Get ad element
const ad_widget = document.getElementById(idName);

// Fetch API
fetchAd(token).then(res => {
    console.log(res);
});