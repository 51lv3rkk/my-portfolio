document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchBtn');
  const temperature = document.getElementById('temperature');
  const city = document.getElementById('city');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('windSpeed');
  const weatherIcon = document.getElementById('weatherIcon');
  const errorMsg = document.getElementById('errorMsg');

  const API_KEY = '4595dd6057bf271dfa5c4af46bf23956';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  function normalizeCityName(cityName) {
      return cityName
          .toLowerCase()
          .trim()
          .replace(/ /g, '');
  }

  async function getWeather(cityName) {
      const normalizedCity = normalizeCityName(cityName);
      if (!normalizedCity) return;

      try {
          const response = await fetch(`${API_URL}?q=${normalizedCity}&appid=${API_KEY}&units=metric`);
          if (!response.ok) {
              throw new Error(response.status === 401 ? 'API Key Lỗi' : 'Không tìm thấy thành phố');
          }
          const data = await response.json();

          temperature.textContent = `${Math.round(data.main.temp)}°C`;
          city.textContent = data.name;
          humidity.textContent = `${data.main.humidity}%`;
          windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
          
          const weatherCondition = data.weather[0].main.toLowerCase();
          updateWeatherIcon(weatherCondition);

          errorMsg.style.display = 'none';
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
          temperature.textContent = 'N/A';
          humidity.textContent = 'N/A';
          windSpeed.textContent = 'N/A';
          city.textContent = 'Không xác định';
          weatherIcon.textContent = '❓';
          errorMsg.textContent = error.message === 'API Key Lỗi' ? 'API Key Lỗi. Vui lòng kiểm tra lại API Key.' : 'Không tìm thấy thành phố. Vui lòng thử lại';
          errorMsg.style.display = 'block';
      }
  }

  function updateWeatherIcon(condition) {
      switch (condition) {
          case 'clear':
              weatherIcon.textContent = '☀️';
              break;
          case 'clouds':
              weatherIcon.textContent = '☁️';
              break;
          case 'rain':
              weatherIcon.textContent = '🌧️';
              break;
          case 'snow':
              weatherIcon.textContent = '❄️';
              break;
          case 'thunderstorm':
              weatherIcon.textContent = '⛈️';
              break;
          default:
              weatherIcon.textContent = '🌤️';
      }
  }

  searchBtn.addEventListener('click', () => {
      const cityName = cityInput.value.trim();
      if (cityName) {
          getWeather(cityName);
      }
  });

  cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && cityInput.value.trim()) {
          searchBtn.click();
      }
  });

  getWeather('Hanoi');
});