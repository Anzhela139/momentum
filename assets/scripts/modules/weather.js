class Weather {
    constructor() {
        const $weatherIcon = document.querySelector('.weather-icon');
        const $temperature = document.querySelector('.temperature');
        const $weatherDescription = document.querySelector('.weather-description');
        this.getWeather();
    }

    async getWeather() {
        let cityLS = localStorage.getItem('city') !== '' ? localStorage.getItem('city') : $city.textContent;
        if (!cityLS) return;

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityLS}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod > 400) {
            $weatherIcon.className = 'weather-icon owf';
            $weatherIcon.classList.add(`owf-800`);
            $temperature.textContent = `No `;
            $weatherDescription.textContent = '[Enter right city name]';

        }
        $weatherIcon.className = 'weather-icon owf';
        $weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        $temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        $weatherDescription.textContent = data.weather[0].description;
    }
}

export default Weather;
