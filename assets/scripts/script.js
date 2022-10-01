const $time = document.querySelector('.time'),
  $greeting = document.querySelector('.greeting'),
  $name = document.querySelector('.name'),
  $focus = document.querySelector('.focus');

const $blockquote = document.querySelector('blockquote'),
  $figcaption = document.querySelector('figcaption'),
  $btnQuote = document.querySelector('#btn-quote');

const $weatherIcon = document.querySelector('.weather-icon');
const $temperature = document.querySelector('.temperature');
const $weatherDescription = document.querySelector('.weather-description');
const $city = document.querySelector('.city');

const $btnImage = document.querySelector('#btn-change-image');

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    
  let day = today.getDate(),
    dayOfWeek = days[ today.getDay() ],
    month = months[ today.getMonth() ];
  $time.innerHTML = `${hour}:${addZeros(min)}:${addZeros(sec)}, ${day} ${dayOfWeek} ${month}`;

  setTimeout(showTime, 1000);
}

const addZeros = (n) => {return (parseInt(n, 10) < 10 ? '0' : '') + n}


let base = '';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const imagesRandom = randomArr(images).splice(5);
let i = 0;
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 6 && hour < 12) {
    $greeting.textContent = 'Good Morning, ';
    base = './assets/images/morning/';
  } 
  else if (hour >= 12 && hour < 18) {
    $greeting.textContent = 'Good Afternoon, ';
    base = './assets/images/afternoon/';
  } 
  else if (hour >= 18 && hour < 18) {
    $greeting.textContent = 'Good Evening, ';
    base = './assets/images/evening/';
    document.body.style.color = 'azure';
  } 
  else {
    $greeting.textContent = 'Good Night, ';
    base = './assets/images/night/';
    document.body.style.color = 'azure';
  }
  return base;
}
setBgGreet();


function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}
function getImage() {
  
  const index = i % images.length;
  const imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
} 

getImage();
function getElem(elem, dom) {
  if (localStorage.getItem(`${elem}`) === null) {
    dom.textContent = `[Enter ${elem}]`;
  } else {
    dom.textContent = localStorage.getItem(`${elem}`);
  }
}


function setName(e) {
  if (e.type === 'keypress') {

    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      $name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {

    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      $focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}
/*
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const quote = await res.json(); 
  $blockquote.textContent = quote.quoteText;
  $figcaption.textContent = quote.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
$btnQuote.addEventListener('click', getQuote);



async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${$city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  $weatherIcon.className = 'weather-icon owf';
  $weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  $temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  $weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    $city.blur();
  }
}


document.addEventListener('DOMContentLoaded', getWeather);
$city.addEventListener('keypress', setCity);

*/

$btnImage.addEventListener('click', getImage);

$name.addEventListener('keypress', setName);
$name.addEventListener('blur', setName);
$focus.addEventListener('keypress', setFocus);
$focus.addEventListener('blur', setFocus);
showTime();
getElem('name', $name);
getElem('focus', $focus);