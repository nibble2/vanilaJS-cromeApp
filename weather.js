const COORDS = 'COORDS';

function saveCoords(coords) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords()
    } else {
        //좌표값을
    }
}

function init() {
    loadCoords();
}

init();