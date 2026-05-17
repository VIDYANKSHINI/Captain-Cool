const axios = require('axios');

// Map common IPL venues to coordinates for Open-Meteo
const VENUE_COORDINATES = {
  'Wankhede Stadium, Mumbai': { lat: 18.9389, lon: 72.8258 },
  'Eden Gardens, Kolkata': { lat: 22.5646, lon: 88.3433 },
  'M. Chinnaswamy Stadium, Bengaluru': { lat: 12.9788, lon: 77.5996 },
  'M.A. Chidambaram Stadium, Chennai': { lat: 13.0628, lon: 80.2793 },
  'Narendra Modi Stadium, Ahmedabad': { lat: 23.0922, lon: 72.5975 },
  'Arun Jaitley Stadium, Delhi': { lat: 28.6378, lon: 77.2432 },
  'Sawai Mansingh Stadium, Jaipur': { lat: 26.8940, lon: 75.8038 },
  'Rajiv Gandhi Intl Stadium, Hyderabad': { lat: 17.4065, lon: 78.5505 },
  'Punjab Cricket Association, Mohali': { lat: 30.6908, lon: 76.7375 },
  'Ekana Cricket Stadium, Lucknow': { lat: 26.8113, lon: 81.0152 }
};

const getVenueWeather = async (venueName) => {
  try {
    const coords = VENUE_COORDINATES[venueName] || VENUE_COORDINATES['Wankhede Stadium, Mumbai']; // default
    
    // Open-Meteo free API (no key required)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,surface_pressure`;
    
    const response = await axios.get(url);
    const current = response.data.current;
    
    // Simple logic to estimate dew probability
    // High humidity (>70%) and dropping temp usually means dew
    let dewWarning = 'Low';
    if (current.relative_humidity_2m > 75) {
      dewWarning = 'High';
    } else if (current.relative_humidity_2m > 60) {
      dewWarning = 'Medium';
    }

    return {
      temperature: `${current.temperature_2m}°C`,
      humidity: `${current.relative_humidity_2m}%`,
      dewWarning: dewWarning,
      isRealData: true
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    // Fallback data
    return {
      temperature: '28°C',
      humidity: '65%',
      dewWarning: 'Medium',
      isRealData: false
    };
  }
};

module.exports = {
  getVenueWeather
};
