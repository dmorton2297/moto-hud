import axios from 'axios'
import * as Location from 'expo-location';


export const getCurrentWeather = async (city, countryCode) => {
  var options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/weather',
    params: {
      q: `${city},${countryCode}`,
      lat: '0',
      lon: '0',
      id: '2172797',
      lang: 'null',
      units: '"imperial"',
      mode: 'xml, html'
    },
    headers: {
      'x-rapidapi-key': 'f7513ae4cdmshf5746727441822bp1ba686jsnb48683cac2f2',
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    }
  };

  try {
    const result = await axios.request(options)
    return result
  } catch (e) {
    console.error('Unable to fetch current weather')
  }
}