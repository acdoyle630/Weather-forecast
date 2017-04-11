/*jshint esversion: 6*/


window.addEventListener('load', pageLoad);

function pageLoad(){
  oReq = new XMLHttpRequest();
  oReq.addEventListener('load', display);
  oReq.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?zip=96815&appid=' + API_KEY);
  oReq.send();
}

function display(){
  const requestData = JSON.parse(this.responseText);
  const weather = requestData.list;
  const city = requestData.city.name;
  console.log(requestData.list);
  const todayDisplay = document.createElement('h1');
  const today = document.querySelector('#city');
  todayDisplay.innerHTML = city;
  today.appendChild(todayDisplay);


  fiveDay(weather);
}

function fiveDay(arr){
  for(var i = 0; i < 40; i+=8){
    const currentDescription = arr[i].weather[0].description;
    const today = document.querySelector('#day' + i/8);
    const currentTemp = arr[i].main.temp;
    const date = arr[i].dt_txt;
    console.log(date);
    const description = document.createElement('h3');
    const currentTempDisplay = document.createElement('h3');
    const currentDate = document.createElement('h2');
    description.innerHTML = currentDescription;
    currentTempDisplay.innerHTML = (currentTemp * 9/5 - 459.67).toFixed(0) + ' Degrees';
    currentDate.innerHTML = date;
    today.appendChild(currentDate);
    today.appendChild(description);
    today.appendChild(currentTempDisplay);
  }
}