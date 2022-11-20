import Background from "./modules/background.js";
import Quote from "./modules/quote.js";
import SetterUserPreference from "./modules/setterUserPreference.js";
import Weather from "./modules/weather.js";
import City from "./modules/city.js";
import Time from "./modules/time.js";

/** инициализирует приложение */
class Momentum {
    constructor() {
        window.userLocation = {};

        this.background = new Background(document.querySelector('.greeting'), document.querySelector('#btn-change-image'));
        this.quote = new Quote(document.querySelector('blockquote'), document.querySelector('figcaption'), document.querySelector('#btn-quote'));
        this.focus = new SetterUserPreference(document.querySelector('.focus'), 'focus');
        this.weather = new Weather();
        this.city = new City(document.querySelector('.city'), this.weather);
        this.time = new Time(document.querySelector('.time'));
        this.name = new SetterUserPreference(document.querySelector('.name'), 'name');

        this.init();
    }

    /**
     * @description - инициализирует приложение
     */
    init() {
        this.time.showTime();
        this.quote.init();
        this.background.checkHour(this.background.setBgImage());
        
        this.city.init();
        this.name.init();
        this.focus.init();
        this.weather.setCity(this.city)
        this.weather.getWeather();
    }
}

document.addEventListener('DOMContentLoaded', new Momentum());
