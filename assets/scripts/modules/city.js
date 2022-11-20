import SetterUserPreference from "./setterUserPreference.js";

/** инициализирует проставление города */
class City extends SetterUserPreference {
    /**
     * @param {HTMLDivElement} cityEl - элемент отображения города в DOM
     * @param {ClassInstance} weather - инстанс класса weather
     */
    constructor(cityEl, weather) {
        super(cityEl, 'city');

        this.cityEl = cityEl;
        this.weather = weather;
    }

    /**
     * @description - инициализирует проставление города
     */
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

    /**
     * @description - расширяет родительский метод и добавляет к нему проверку погоды
     */
    setUserPreference(e) {
        if (e.type === 'keypress') {
            if (e.which == 13 || e.keyCode == 13) {
                this.weather.getWeather(e.target.innerText);
            }
        }
        super.setUserPreference(e);
    }

    /**
     * @description - возвращает строку либо координатами пользователя, либо название города, введенное пользователем
     * @return {String} - строка либо координатами пользователя, либо название города, введенное пользователем
     */
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