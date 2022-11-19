class Weather {
    constructor() {
        this.weatherIcon = document.querySelector('.weather-icon');
        this.temperature = document.querySelector('.temperature');
        this.weatherDescription = document.querySelector('.weather-description');
        this.city = null;
    }

    setCity(city) {
        this.city = city;
    }

    async getWeather() {
        let cityLS = this.city.getCity();

        if (!cityLS) return;

        let url = `https://api.openweathermap.org/data/2.5/weather?${cityLS}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
        fetch(url)
            .then(async (res) => {
                const data = await res.json();

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

    getWeatherError() {
        this.weatherIcon.className = 'weather-icon owf';
        this.weatherIcon.classList.add(`owf-800`);
        this.temperature.textContent = `No `;
        this.weatherDescription.textContent = '[Enter right city name]';
    }
}

export default Weather;
