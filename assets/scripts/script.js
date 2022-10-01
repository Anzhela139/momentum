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

const randomArr = (arr) => arr.slice(0).sort( (a,b)=> 0.5-Math.random()); 

let base = '';
const baseArr = ['./assets/images/morning/', './assets/images/afternoon/', './assets/images/evening/', './assets/images/night/'];
let setBg = (index, arr) => randomArr(arr).splice(13).map(item => index + item);

const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let imagesRandom = [];
let indextime = 0;
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour >= 6 && hour < 12) {
    $greeting.textContent = 'Good Morning, ';
    base = './assets/images/morning/';
    indextime = 0;
  } 
  else if (hour >= 12 && hour < 18) {
    $greeting.textContent = 'Good Afternoon, ';
    base = './assets/images/afternoon/';
    indextime = 1;
  } 
  else if (hour >= 18 && hour <= 23) {
    $greeting.textContent = 'Good Evening, ';
    base = './assets/images/evening/';
    indextime = 2;

  } 
  else {
    $greeting.textContent = 'Good Night, ';
    base = './assets/images/night/';
    indextime = 3;
    //document.body.style.color = 'azure';
  }
  return base;
}
setBgGreet(base);

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src}), url(./assets/images/overlay.png)`;
  }; 
}
let i = 0;

function getImage() {
  let basedImages = [];
  if (indextime === 0) {
    basedImages = [setBg(baseArr[0], images), setBg(baseArr[1], images), setBg(baseArr[2], images), setBg(baseArr[3], images)];
  }
  else if (indextime === 1) {
    basedImages = [setBg(baseArr[1], images), setBg(baseArr[2], images), setBg(baseArr[3], images), setBg(baseArr[0], images)];
  }
  else if (indextime === 2) {
    basedImages = [setBg(baseArr[2], images), setBg(baseArr[3], images), setBg(baseArr[0], images), setBg(baseArr[1], images)];
  }
  else if (indextime === 3) {
    basedImages = [setBg(baseArr[3], images), setBg(baseArr[0], images), setBg(baseArr[1], images), setBg(baseArr[2], images)];
  }
  basedImages = basedImages.flat();
  const index = i % basedImages.length;
  const imageSrc = `${basedImages[index]}`;
  viewBgImage(imageSrc);
  console.log('working')
  i++;  
  $btnImage.disabled = true;
  setTimeout(function() {$btnImage.disabled = false}, 1000);
} 

getImage();
function checkHour(func) {
  let today = new Date(),
  min = today.getMinutes();

  if (min !== 00) {
    //func();

    let timeout = (60 - min) * 60000;
    console.log(timeout);
    setTimeout(func(), timeout);
  }
}
checkHour(getImage);

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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${$city.textContent}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
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
getElem('city', $city);