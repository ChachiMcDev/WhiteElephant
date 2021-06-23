import { getGameName, setVictim, saveplayers, removePlayer, getPlayers, sortyByFilter, setGameName } from './whiteelephant'
import { getFilters } from './filters'


const whiteElePlayers = getPlayers()
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


const initilizePage = () => {
    renderGameName();
}


const createPlayersHeader = () => {
    const row1 = document.createElement('div');

    const col1 = document.createElement('div');
    const playerHead = document.createElement('div');

    const col2 = document.createElement('div');
    const victimHead = document.createElement('div');

    playerHead.textContent = 'PLAYER';
    victimHead.textContent = 'VICTIM';

    playerHead.classList.add('player-header');
    row1.classList.add('row');
    col1.classList.add('col-6');
    col2.classList.add('col-6');

    col1.appendChild(playerHead);
    col2.appendChild(victimHead);

    row1.appendChild(col1);
    row1.appendChild(col2);

    return row1;
}


const createElephantDOM = (element) => {
    const row1 = document.createElement('div');
    const col1 = document.createElement('div');
    const col2 = document.createElement('div');
    const removeButton = document.createElement('button');
    const playerText = document.createElement('div');
    const victimText = document.createElement('div');

    victimText.classList.add('list-item__victim');
    playerText.classList.add('list-item__player');
    row1.classList.add('row', 'list-item');
    col1.classList.add('col-6');
    col2.classList.add('col-6');

    removeButton.classList.add('button', 'button--text', 'btn', 'btn-danger', 'rmv--button');
    removeButton.id = element.id;

    playerText.textContent = element.firstName.capitalize();
    victimText.textContent = element.victimName.capitalize();
    removeButton.textContent = 'X PLAYER';


    removeButton.addEventListener('click', (event) => {
        removePlayer(element.id);
        saveplayers(whiteElePlayers);
        setVictim();
        renderGame();
    });

    col1.appendChild(removeButton);
    col1.appendChild(playerText);
    col2.appendChild(victimText);

    row1.appendChild(col1);
    row1.appendChild(col2);

    return row1;
}

const addLastNameDOM = (element) => {
    const row1 = document.createElement('div');
    const col1 = document.createElement('div');
    const col2 = document.createElement('div');
    const removeButton = document.createElement('button');
    const playerText = document.createElement('div');
    const victimText = document.createElement('div');

    victimText.classList.add('list-item__victim');
    playerText.classList.add('list-item__player');
    row1.classList.add('row', 'list-item');
    col1.classList.add('col-6');
    col2.classList.add('col-6');

    removeButton.classList.add('button', 'button--text', 'btn', 'btn-danger', 'rmv--button');
    removeButton.id = element.id;

    playerText.textContent = element.firstName.capitalize() + ' ' + element.lastName.capitalize();
    victimText.textContent = element.victimName.capitalize() + ' ' + element.lastName.capitalize();
    removeButton.textContent = 'X PLAYER'


    removeButton.addEventListener('click', (event) => {

        removePlayer(element.id);
        saveplayers(whiteElePlayers);
        setVictim();
        renderGame();
    });

    col1.appendChild(removeButton);
    col1.appendChild(playerText);
    col2.appendChild(victimText);

    row1.appendChild(col1);
    row1.appendChild(col2);

    return row1;

}



const renderGame = () => {
    const filters = getFilters();
    const players = sortyByFilter(filters.sortBy);

    const filteredPlayers = players.filter(player => player.firstName.toLowerCase().includes(filters.searchText.toLowerCase()));

    console.log('from rendergame function: ', filters.showLastName, filters.sortBy);
    document.querySelector('#player-container').innerHTML = "";

    if (players) {
        if (filters.showLastName === true) {
            filteredPlayers.forEach(element => {
                document.querySelector('#player-container').appendChild(createPlayersHeader());
                document.querySelector('#player-container').appendChild(addLastNameDOM(element));
            });
        } else {
            filteredPlayers.forEach(element => {
                document.querySelector('#player-container').appendChild(createPlayersHeader());
                document.querySelector('#player-container').appendChild(createElephantDOM(element));
            });
        }

    };

}





export { initilizePage, renderGame }