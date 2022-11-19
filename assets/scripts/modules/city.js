import { getElem } from "./utils.js";

class City {
    constructor(cityEl, weather) {
        this.cityEl = cityEl;
        this.weather = weather;
    }

    init() {
        this.getUserLocation();
        this.cityEl.addEventListener('keypress', this.setCity.bind(this));
        this.cityEl.addEventListener('blur', this.setCity.bind(this));

        getElem('city', this.cityEl);
    }

    /**
     * @description - определяет местоположения пользователя
     */
    async getUserLocation() {
        function success({ coords }) {
            const { latitude, longitude } = coords;
            console.log(coords)
            window.userLocation = {
                latitude: latitude, 
                longitude: longitude
            };
        }
            
        function error({ message }) {
            console.log(message);
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success.bind(this), error, {
                enableHighAccuracy: true
            }) 
        }
    }

    setCity(e) {
        if (e.type === 'keypress') {
            if (e.which == 13 || e.keyCode == 13) {
                if (e.target.innerText === '') {
                    e.target.innerText = localStorage.getItem('city');
                    this.cityEl.innerText = localStorage.getItem('city');
                }
                else {
                    localStorage.setItem('city', e.target.innerText);
                }
                this.weather.getWeather();
                this.cityEl.blur();
            }
        } else {
            localStorage.setItem('city', e.target.innerText);
        }
    }
}

export default City;