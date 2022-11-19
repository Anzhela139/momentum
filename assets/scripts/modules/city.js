import SetterUserPreference from "./setterUserPreference.js";

class City extends SetterUserPreference {
    constructor(cityEl, weather) {
        super(cityEl, 'city');
        this.cityEl = cityEl;
        this.weather = weather;
    }

    init() {
        super.init();

        this.getUserLocation();
    }

    /**
     * @description - определяет местоположения пользователя
     */
    async getUserLocation() {
        function success({ coords }) {
            const { latitude, longitude } = coords;

            window.userLocation = {
                latitude: latitude, 
                longitude: longitude
            };
            this.weather.getWeather(window.userLocation);
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

    setUserPreference(e) {
        if (e.type === 'keypress') {
            if (e.which == 13 || e.keyCode == 13) {
                this.weather.getWeather(e.target.innerText);
            }
        }
        super.setUserPreference(e);
    }

    getCity() {
        let cityLS = '';
        if(typeof city !== 'object' || Object.keys(city).length === 0) {
            cityLS = `q=${localStorage.getItem('city') !== '' ? localStorage.getItem('city') : this.cityEl.textContent}&lang=en`;
        } else {
            cityLS =  `lat=${window.userLocation.userLocation?.latitude}&lon=${window.userLocation.userLocation?.longitude}`;
        }

        return cityLS;
    }
}

export default City;