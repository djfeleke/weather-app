<<<<<<< HEAD
# Weather App

A simple and modern web application that provides a 5-day weather forecast for any city using the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) and [Open-Meteo Weather API](https://open-meteo.com/en/docs). The app is designed for clarity, accessibility, and ease of use.

---

## Features

- **City Search:** Enter any city name to get the latest 5-day weather forecast.
- **Forecast Details:** See daily minimum and maximum temperatures in both Celsius and Fahrenheit.
- **Weather Icons:** Instantly recognize weather conditions with intuitive emoji icons.
- **Robust Error Handling:** Friendly messages for invalid input, city not found, or network/API issues.
- **Accessibility:** Loading states and ARIA attributes for a better user experience.
- **Responsive UI:** Works well on desktop and mobile browsers.

---

## Screenshots

![Weather App Screenshot](screenshot.png)  
*Example: 5-day forecast for London with weather icons and temperature ranges.*

---

## How It Works

1. **Enter a city name** in the input box and click "Get Weather".
2. The app fetches the city’s coordinates using the Open-Meteo Geocoding API.
3. It then retrieves a 5-day weather forecast for that location.
4. The forecast is displayed with weather icons, descriptions, and temperature ranges in °C and °F.

---

## Getting Started

1. **Clone or download** this repository.
2. Open `index.html` in your web browser.
3. Enter a city name and click "Get Weather" to view the forecast.

---

## Project Structure

```
weather-app/
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── weather-icons/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   ├── app.js
│   │   └── ui.js
│   └── index.html
├── tests/
│   └── test_weather_api.py
└── README.md
```

---

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Weather API](https://open-meteo.com/en/docs)

---

## Accessibility & Security

- Uses `textContent` for error messages to prevent XSS.
- Loading state and ARIA attributes for screen readers.
- Input validation to ensure only valid city names are accepted.

---

## License

This project is for educational and personal use.  
Weather data is provided by [Open-Meteo](https://open-meteo.com/). Please review their [terms of service](https://open-meteo.com/en/terms) for API usage.

---

## Credits

- Weather icons are represented using Unicode emoji.
- Thanks to [Open-Meteo](https://open-meteo.com/) for free weather data APIs.

---

## Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss changes or improvements.

---
```# Weather App

A simple and modern web application that provides a 5-day weather forecast for any city using the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) and [Open-Meteo Weather API](https://open-meteo.com/en/docs). The app is designed for clarity, accessibility, and ease of use.

---

## Features

- **City Search:** Enter any city name to get the latest 5-day weather forecast.
- **Forecast Details:** See daily minimum and maximum temperatures in both Celsius and Fahrenheit.
- **Weather Icons:** Instantly recognize weather conditions with intuitive emoji icons.
- **Robust Error Handling:** Friendly messages for invalid input, city not found, or network/API issues.
- **Accessibility:** Loading states and ARIA attributes for a better user experience.
- **Responsive UI:** Works well on desktop and mobile browsers.

---

## Screenshots

![Weather App Screenshot](screenshot.png)  
*Example: 5-day forecast for London with weather icons and temperature ranges.*

---

## How It Works

1. **Enter a city name** in the input box and click "Get Weather".
2. The app fetches the city’s coordinates using the Open-Meteo Geocoding API.
3. It then retrieves a 5-day weather forecast for that location.
4. The forecast is displayed with weather icons, descriptions, and temperature ranges in °C and °F.

---

## Getting Started

1. **Clone or download** this repository.
2. Open `index.html` in your web browser.
3. Enter a city name and click "Get Weather" to view the forecast.

---

## Project Structure

```
weather-app/
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── weather-icons/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   ├── app.js
│   │   └── ui.js
│   └── index.html
├── tests/
│   └── test_weather_api.py
└── README.md

```

---

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Weather API](https://open-meteo.com/en/docs)

---

## Accessibility & Security

- Uses `textContent` for error messages to prevent XSS.
- Loading state and ARIA attributes for screen readers.
- Input validation to ensure only valid city names are accepted.

---

## License

This project is for educational and personal use.  
Weather data is provided by [Open-Meteo](https://open-meteo.com/). Please review their [terms of service](https://open-meteo.com/en/terms) for API usage.

---

## Credits

- Weather icons are represented using Unicode emoji.
- Thanks to [Open-Meteo](https://open-meteo.com/) for free weather data APIs.

---

## Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss changes or improvements.

---
=======
# weather-app
>>>>>>> 177fc47a24a7bb38248d8d0496dfc03f40a79a1c
