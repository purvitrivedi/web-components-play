const apiKey = import.meta.env.VITE_API_KEY;

class Weather extends HTMLElement {
  constructor() {
    super();
    this.weatherResults = {};
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <slot></slot>
    <link rel="stylesheet" href="/styles/weather.css">
    <div class="weather-wrap">
    </div>
`;
  }

  connectedCallback() {
    this._fetchWeather();
  }

  async _fetchWeather() {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=${apiKey}`);
      const json = await res.json();

      if (json.error) {
        throw new Error(json.error);
      }

      this.weatherResults = json.main;
      const weatherWrapper = this.shadowRoot.querySelector('.weather-wrap');

      const image = document.createElement('img');
      if (this.weatherResults.temp > 18) {
        image.setAttribute('src', 'styles/images/sun.png');
      } else {
        image.setAttribute('src', '/styles/images/cloudy.png');
      }

      weatherWrapper.appendChild(image);



      for (const key in this.weatherResults) {

        if (key === 'pressure') continue;

        const keyEdit = key.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        const result = document.createElement('p');
        result.innerHTML = `${keyEdit}: <span>${Math.round(this.weatherResults[key])}</span>`;
        weatherWrapper.appendChild(result);
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    }
  }
}

customElements.define('pt-weather-app', Weather);