document.getElementById('searchBtn').addEventListener('click', fetchWeather);

async function fetchWeather() {
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a city or zip code');
        return;
    }
    
    const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Weather data not found. Please check your input.');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('city').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('icon').alt = data.weather[0].description;
    
    document.getElementById('weather-info').classList.remove('hidden');
}
