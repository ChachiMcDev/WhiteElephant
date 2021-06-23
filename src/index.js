import { setVictim, setGameName, createdElephantPlayer, resetElephant } from './whiteelephant'
import { initilizePage, renderGameName, renderGame } from './view'
import { setFilters, getFilters } from './filters'



initilizePage();
renderGame();
    //upon submit run this

document.querySelector('#run-elephant').addEventListener('click', function(event) {
    setVictim();
    renderGame();

});

document.querySelector('#searchtext').addEventListener('input', (event) => {

    setFilters({
        searchText: event.target.value
    })
    renderGame();
})

document.querySelector('#new-player').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(event.target.elements.text.value);
    createdElephantPlayer(event.target.elements.text.value);
    setVictim();
    event.target.elements.text.value = '';
    renderGame();

});
/* ***--save game name to be evaluated at later date --****
document.querySelector('#gamename-entry').addEventListener('submit', function(event) {
    event.preventDefault()
    console.log(event.target.elements.text.value)
    setGameName(event.target.elements.text.value)
    renderGameName()

})
*/

document.querySelector('#filterby').addEventListener('change', function(event) {

    setFilters({
        sortBy: event.target.value
    })

    renderGame();
})

document.querySelector('#reset-elephant').addEventListener('click', (event) => {
    resetElephant();
    renderGame();
    renderGameName();
})



document.querySelector('#show-last-name').addEventListener('change', (event) => {
    setFilters({
        showLastName: event.target.checked
    })
    renderGame();
})