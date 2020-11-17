const API_KEY = '5ecfaa9ae25a4ec32abcdf78238c6bb0';
const COORDS = 'COORDS';

function saveCoords(coords) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function getWether(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        //우리한테 데이터가 완전히 넘어 왔을 때 함수 호출(데이터가 오는데 시간이 좀 걸리는 경우가 있다)
        //네트워크 텝에서 온 response json 가져오고 싶어
    ).then(function (response) {
        return response.json();
        //대기상태
    }).then(function (json) {
        console.log(json);
    });
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
        // console.log(parsedCoords);
        getWether(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();