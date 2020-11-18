const weather = document.querySelector(".js-weather");

const API_KEY = '5ecfaa9ae25a4ec32abcdf78238c6bb0';
const COORDS = 'COORDS';

function saveCoords(coords) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function getWether(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        //우리한테 데이터가 완전히 넘어 왔을 때 함수 호출(데이터가 오는데 시간이 좀 걸리는 경우가 있다)
        //네트워크 텝에서 온 response json 가져오고 싶어
    ).then(function (response) {
        console.log("This is response");
        return response.json();
        //대기상태
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
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
        const parsedCoords = JSON.parse(loadedCoords);
        console.log("1 ", parsedCoords);
        getWether(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();