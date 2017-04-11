/*jshint esversion: 6*/


window.addEventListener('load', pageLoad);
const today = document.querySelector('day0');

function pageLoad(){
  oReq = new XMLHttpRequest();
  oReq.addEventListener('load', display);
  oReq.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?zip=96815&appid=' + API_KEY);
  oReq.send();
}

function display(){
  const requestData = JSON.parse(this.responseText);
  const weather = requestData;
  console.log(weather);
}
