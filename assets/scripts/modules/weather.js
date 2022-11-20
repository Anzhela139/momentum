import { wrapFetchCall } from "./utils.js";

/** инициализирует виджет погоды */
class Weather {
    /**
     * @param {HTMLIElement} weatherIcon - элемент DOM для проставления иконки
     * @param {HTMLDivElement} temperature - элемент DOM для проставления температуры
     * @param {HTMLDivElement} weatherDescription - элемент DOM проставления описания погоды
     * @param {ClassInstance} city - инстанс класса city
     */
    constructor() {
        this.weatherIcon = document.querySelector('.weather-icon');
        this.temperature = document.querySelector('.temperature');
        this.weatherDescription = document.querySelector('.weather-description');
        this.city = null;
    }
    
    /**
     * @param {ClassInstance} city - инстанс класса city
     */
    setCity(city) {
        this.city = city;
    }

    /**
     * @description - получает данные о погоде по метоположению пользователя, либо по городу который он указал по апи
     */
    async getWeather() {
        let cityLS = this.city.getCity();

        if (!cityLS) return;

        let url = `https://api.openweathermap.org/data/2.5/weather?${cityLS}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
        wrapFetchCall(url, './assets/scripts/spareApis/weatherApi.json')
            .then(async (res) => {
                const data = await res;

                if (data.cod > 400) {
                    this.getWeatherError();
                }
                this.weatherIcon.className = 'weather-icon owf';
                this.weatherIcon.classList.add(`owf-${data.weather[0].id}`);
                this.temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
                this.weatherDescription.textContent = data.weather[0].description;
            })
            .catch((err) => {
                console.log(err);
                this.getWeatherError();
            })
    }

    /**
     * @description - показывает ошибку, если апи не нашло погоду по городу
     */
    getWeatherError() {
        this.weatherIcon.className = 'weather-icon owf';
        this.weatherIcon.classList.add(`owf-800`);
        this.temperature.textContent = `No `;
        this.weatherDescription.textContent = '[Enter right city name]';
    }
}

export default Weather;
