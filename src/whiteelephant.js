import { v4 as uuidv4 } from 'uuid'

let whiteElePlayers = [];

const createdElephantPlayer = (firstlastname) => {
    const id = uuidv4();
    firstlastname = firstlastname.split(' ');
    const getLength = whiteElePlayers.length;

    if (firstlastname.length > 0) {
        whiteElePlayers.push({
            id: id,
            firstName: firstlastname[0],
            lastName: firstlastname[1],
            victimName: '',
            victimLastName: '',
            victimId: '',
            origSlotNum: getLength,
            familyname: ''
        })

        saveplayers(whiteElePlayers);
    };
}


const removePlayer = (playerid) => {
    const playerIndex = whiteElePlayers.findIndex((element) => element.id === playerid);
    if (playerIndex > -1) {
        whiteElePlayers.splice(playerIndex, 1);
    }

    //remove victim
    const findVictim = whiteElePlayers.find((element) => element.victim === playerid);
        //set all victims to zero
    whiteElePlayers.forEach((element) => {
        element.victim = ''
    });


    //  return whiteElePlayers
}

const saveplayers = (whiteElePlayers) => {
    localStorage.setItem('theplayers', JSON.stringify(whiteElePlayers));
}


const getPlayers = () => {
    const getJSON = localStorage.getItem('theplayers');

    try {
        return getJSON ? JSON.parse(getJSON) : [];

    } catch (e) {
        console.log('Invalid JSON! Setting array to []', e.message);
        return 'error';

    }


}


const resetElephant = () => {
    saveplayers(whiteElePlayers = []);
    setGameName('');
}



const getGameName = () => {
    const theJson = localStorage.getItem('gameName');
    try {
        return theJson ? JSON.parse(theJson) : setGameName('Your Game Name');
    } catch (e) {
        console.log('Invalid JSON!', e.message);
        return 'error';

    }

}

const setGameName = (gameName) => {

    localStorage.setItem('gameName', JSON.stringify(gameName));
}



//randomly shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}




//after array gets randomized we 
const setVictim = () => {
    //shuffle before assignment

    shuffleArray(whiteElePlayers);


    whiteElePlayers.forEach(element => {
        if (whiteElePlayers.indexOf(element) === whiteElePlayers.length - 1) {
            element.victimId = whiteElePlayers[0].id;
            element.victimName = whiteElePlayers[0].firstName;
            element.victimLastName = whiteElePlayers[0].lastName;
        } else {
            const addOne = whiteElePlayers.indexOf(element) + 1;
            element.victimId = whiteElePlayers[addOne].id;
            element.victimName = whiteElePlayers[addOne].firstName;
            element.victimLastName = whiteElePlayers[addOne].lastName;
        };
    });


    saveplayers(whiteElePlayers);

}



//sort by original slot number
const sortyByFilter = (sortBy) => {
    if (sortBy === 'firstName') {
        return whiteElePlayers.sort(function(a, b) {
            const firstNameA = a.firstName.toUpperCase();
            const firstNameB = b.firstName.toUpperCase();

            if (firstNameB > firstNameA) {
                return -1;
            } else if (firstNameB < firstNameA) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'victim') {
        return whiteElePlayers.sort(function(a, b) {
            const victimNameA = a.victimName.toUpperCase();
            const victimNameB = b.victimName.toUpperCase();
            if (victimNameB > victimNameA) {
                return -1;
            } else if (victimNameB < victimNameA) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'origSlotNum') {
        return whiteElePlayers.sort(function(a, b) {
            return a.origSlotNum - b.origSlotNum;
        })
    } else {
        return whiteElePlayers;
    }
}


whiteElePlayers = getPlayers();

export { setVictim, setGameName, getGameName, getPlayers, saveplayers, removePlayer, sortyByFilter, createdElephantPlayer, resetElephant }