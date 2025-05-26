// Weather App - Open-Meteo API Integration

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const TIMEOUT = 10000; // 10 seconds

/**
 * Fetches weather data for a given city.
 * @param {string} city - The name of the city.
 * @returns {Promise<Object>} - Weather data or error object.
 */
async function getWeatherData(city) {
    // Validate input: check if city is a non-empty string containing letters
    if (
        !city ||
        typeof city !== 'string' ||
        city.trim() === '' ||
        !/[a-zA-Z]/.test(city)
    ) {
        return { error: 'Please provide a valid city name containing letters.' };
    }

    try {
        // Step 1: Get latitude and longitude from Open-Meteo Geocoding API
        const geoUrl = `${GEO_API_URL}?name=${encodeURIComponent(city.trim())}&count=1`;
        const geoRes = await fetchWithTimeout(geoUrl);
        if (!geoRes.ok) {
            return { error: `Geocoding API error: ${geoRes.status} ${geoRes.statusText}` };
        }
        const geoData = await geoRes.json();

        // Check if the city was found
        if (!geoData.results?.[0]) {
            return { error: 'City not found. Please check the spelling and try again.' };
        }

        // Extract location data
        const { latitude, longitude, name: foundCity } = geoData.results[0];

        // Step 2: Get 5-day weather forecast from Open-Meteo Weather API
        const weatherUrl = `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;
        const weatherRes = await fetchWithTimeout(weatherUrl);
        if (!weatherRes.ok) {
            return { error: `Weather API error: ${weatherRes.status} ${weatherRes.statusText}` };
        }
        const weatherData = await weatherRes.json();

        // Check if weather data is available
        if (!weatherData.daily) {
            return { error: 'Weather data not available for this location.' };
        }

        // Step 3: Prepare and return the result
        return {
            city: foundCity,
            forecast: weatherData.daily.time.map((date, index) => ({
                date,
                maxTemp: weatherData.daily.temperature_2m_max[index],
                minTemp: weatherData.daily.temperature_2m_min[index],
                weatherCode: weatherData.daily.weathercode[index]
            }))
        };
    } catch (error) {
        console.error(error);
        return { error: error.message || 'An unexpected error occurred.' };
    }
}

/**
 * Fetches data from a URL with a timeout.
 * @param {string} url - The URL to fetch from.
 * @param {Object} options - Fetch options.
 * @returns {Promise<Response>} - The fetch response.
 */
async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw error;
    }
}

/**
 * Gets a weather icon and description based on the weather code.
 * @param {number} weatherCode - The weather code.
 * @returns {Object} - { icon, description }
 */
function getWeatherIcon(weatherCode) {
    const weatherMap = {
        0: { icon: '☀️', description: 'Clear sky' },
        1: { icon: '🌤️', description: 'Mainly clear' },
        2: { icon: '⛅', description: 'Partly cloudy' },
        3: { icon: '☁️', description: 'Overcast' },
        45: { icon: '🌫️', description: 'Fog' },
        48: { icon: '🌫️', description: 'Depositing rime fog' },
        51: { icon: '🌦️', description: 'Light drizzle' },
        53: { icon: '🌦️', description: 'Moderate drizzle' },
        55: { icon: '🌧️', description: 'Dense drizzle' },
        61: { icon: '🌧️', description: 'Slight rain' },
        63: { icon: '🌧️', description: 'Moderate rain' },
        65: { icon: '🌧️', description: 'Heavy rain' },
        71: { icon: '🌨️', description: 'Slight snow fall' },
        73: { icon: '🌨️', description: 'Moderate snow fall' },
        75: { icon: '🌨️', description: 'Heavy snow fall' },
        95: { icon: '⛈️', description: 'Thunderstorm' },
    };
    return weatherMap[weatherCode] || { icon: '❓', description: 'Unknown' };
}

/**
 * Formats a date string to a more readable format.
 * @param {string} dateString - The date string in YYYY-MM-DD format.
 * @returns {string} - Formatted date string.
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

// --- UI Event Handler ---

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput').value;
    const resultElem = document.getElementById('result');
    const cityNameElem = document.getElementById('cityName');
    const button = document.getElementById('getWeatherBtn');

    // Accessibility: Announce loading state
    resultElem.setAttribute('aria-busy', 'true');
    resultElem.textContent = 'Loading...';
    cityNameElem.textContent = '';
    button.disabled = true;

    const data = await getWeatherData(cityInput);

    button.disabled = false;
    resultElem.setAttribute('aria-busy', 'false');

    if (data.error) {
        // Use textContent for error messages to avoid XSS
        resultElem.textContent = data.error;
    } else {
        cityNameElem.textContent = data.city;
        // Build forecast HTML
        const forecastFragment = document.createDocumentFragment();
        data.forecast.forEach(day => {
            const weather = getWeatherIcon(day.weatherCode);

            const dayDiv = document.createElement('div');
            dayDiv.className = 'forecast-day';

            const dateDiv = document.createElement('div');
            dateDiv.className = 'forecast-date';
            dateDiv.textContent = formatDate(day.date);

            const iconDiv = document.createElement('div');
            iconDiv.className = 'forecast-icon';
            iconDiv.textContent = weather.icon;

            const descDiv = document.createElement('div');
            descDiv.className = 'forecast-description';
            descDiv.textContent = weather.description;

            const tempDiv = document.createElement('div');
            tempDiv.className = 'forecast-temp';

            const minTempC = day.minTemp.toFixed(1);
            const maxTempC = day.maxTemp.toFixed(1);
            const minTempF = (day.minTemp * 9 / 5 + 32).toFixed(1);
            const maxTempF = (day.maxTemp * 9 / 5 + 32).toFixed(1);

            const minDiv = document.createElement('div');
            minDiv.textContent = `Min: ${minTempC}°C / ${minTempF}°F`;

            const maxDiv = document.createElement('div');
            maxDiv.textContent = `Max: ${maxTempC}°C / ${maxTempF}°F`;

            tempDiv.appendChild(minDiv);
            tempDiv.appendChild(maxDiv);

            dayDiv.appendChild(dateDiv);
            dayDiv.appendChild(iconDiv);
            dayDiv.appendChild(descDiv);
            dayDiv.appendChild(tempDiv);

            forecastFragment.appendChild(dayDiv);
        });

        // Clear previous content and append new forecast
        resultElem.innerHTML = '';
        resultElem.appendChild(forecastFragment);
    }
});

