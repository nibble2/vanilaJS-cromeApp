const API_KEY = '5ecfaa9ae25a4ec32abcdf78238c6bb0';
const COORDS = 'COORDS';

function saveCoords(coords) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function getWether(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`);
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWether(latitude, longitude);
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