const key = '6b5fb0b1738a1bf1df7b0a84a46818b0'
const searchBox = document.querySelector('#inp')
searchBox.addEventListener('keydown',setQuery);

function setQuery(e){
    if(e.keyCode === 13){
        getResults(searchBox.value);    
    }
    
}

async function getResults  (query) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${key}`)
    
    .then(response => {
        if(!response.ok){
            alert('Enter a valid City')
            searchBox.value = ""
            throw new Error("No weather found.")
        }
        const val = response.json();
        // if(val.ok)
        console.log(val);
        return val;
    }).then(displayResults);
    
}

function displayResults(weather) {
    searchBox.value= ""
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now);

    const {icon, main} = weather.weather[0];
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + "@4x.png"

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .desc');
    weather_el.innerText = main;

    let hilow = document.querySelector('.hi-low')
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function dateBuilder (d) {
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}  ${year}`
}