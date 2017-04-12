/*jshint esversion: 6*/
const update = document.querySelector('#update');
const page = document.querySelector('.day');
const zip = document.querySelector('#zip');
update.addEventListener('click', pageLoad);

function pageClear(){
  page.innerHTML = '';
  pageLoad();
}


function pageLoad(){
  oReq = new XMLHttpRequest();
  oReq.addEventListener('load', display);
  oReq.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?zip='+ zip.value + '&appid=' + API_KEY);
  oReq.send();
}

function display(){
  const requestData = JSON.parse(this.responseText);
  const weather = requestData.list;
  const city = requestData.city.name;
  const todayDisplay = document.createElement('h1');
  const today = document.querySelector('#city');
  todayDisplay.innerHTML = city;
  today.appendChild(todayDisplay);


  fiveDay(weather);
}

function fiveDay(arr){
  for(var i = 0; i < 40; i+=8){
    const currentDescription = arr[i].weather[0].description;
    const hour = i;
    const today = document.querySelector('#day' + i/8);
    today.addEventListener('click', function(){
      hourForecast(hour);
    });
    const currentTemp = arr[i].main.temp;
    const date = arr[i].dt_txt;
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

var curHour = 0;
function hourForecast(hour){
  curHour = hour;
  console.log(hour);
  oReq = new XMLHttpRequest();
  oReq.addEventListener('load', hourDisplay);
  oReq.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?zip=60137&appid=' + API_KEY);
  oReq.send();
}


function hourDisplay(){
  const requestData = JSON.parse(this.responseText);
  const weather = requestData;
  //console.log(weather.list[0].weather[0].description);
  console.log(curHour);
  const today = document.querySelector('#day'+curHour/8);
  console.log(requestData);
  for(var i = curHour; i <= curHour+3; i++){
    const currentDescription = weather.list[i].weather[0].description;
    const currentDate = requestData.list[i].dt_txt;
    const currentTemp = requestData.list[i].main.temp;
    console.log(currentTemp);
    const temp = document.createElement('h3');
    const description = document.createElement('h3');
    const date = document.createElement('h3');
    temp.innerHTML = (currentTemp * 9/5 - 459.67).toFixed(0) + ' degrees';
    description.innerHTML = currentDescription;
    date.innerHTML = currentDate;
    today.appendChild(date);
    today.appendChild(description);
    today.appendChild(temp);
  }
}