const API_KEY = "bf3631c0fb6dfb46187d982c863cb897";
const COORDS = 'coords';

const weather = document.querySelector(".js-weather");
 
function getWeather(lat, log) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
        ).then(function(response){ // 위의 데이터를 가져오는 과정이 끝나고 나서 실행됨
            // console.log(response.json());
            return response.json();
        }).then(function(json){
            
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature} @ ${place}`;
        });
}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

//좌표를 가져오는데 성공했을 경우 호출
function handleGeoSucces(position) {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

//좌표를 가져오는데 실패했을 경우 호출
function handleGeoError() {
    console.log('Cant access geo location')
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords)
        getWeather(parseCoords.latitude,parseCoords.longitude);

    }
}

function init() {
    loadCoords();
}

init();