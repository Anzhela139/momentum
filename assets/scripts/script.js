import Background from "./modules/background.js";
import Quote from "./modules/quote.js";
import Focus from "./modules/focus.js";
import Weather from "./modules/weather.js";
import City from "./modules/city.js";
import Time from "./modules/time.js";
import Name from "./modules/name.js";

class Momentum {
    constructor() {
        this.today = new Date();
        this.background = new Background(document.querySelector('.greeting'), document.querySelector('#btn-change-image'));
        this.quote = new Quote(document.querySelector('blockquote'), document.querySelector('figcaption'), document.querySelector('#btn-quote'));
        this.focus = new Focus(document.querySelector('.focus'));
        this.weather = new Weather();
        this.city = new City(document.querySelector('.city'), this.weather);
        this.time = new Time(document.querySelector('.time'));
        this.name = new Name(document.querySelector('.name'));

        this.init();
    }

    init() {
        this.time.showTime();

        const $btnQuote = document.querySelector('#btn-quote');


        this.quote.getQuote();
        this.background.checkHour(this.background.getImage());
        $btnQuote.addEventListener('click', this.quote.getQuote.bind(this.quote));

        this.name.init();
        this.focus.init();
        this.city.init();
    }
}

document.addEventListener('DOMContentLoaded', new Momentum());
