import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return;
  }
  const location = await Location.getCurrentPositionAsync({
    accuracy: 3
  });
  //{"coords": {"accuracy": 26.530000686645508, "altitude": 161.25544225580242, "altitudeAccuracy": 3, "heading": 335.5970764160156, "latitude": 41.8996357, "longitude": -87.6580566, "speed": 0.15778209269046783}, "mocked": false, "timestamp": 1622601907430}
  const descriptors = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  })
  const currentDescription = descriptors[0] || null
  if (currentDescription) {
    return {
      ...location,
      city: currentDescription.city,
      countryCode: currentDescription.isoCountryCode
    }
  }
  return location
}

export const buildUpdatedLocationArray = (locations, location, trip) => {
  if (!trip?.identifier) return [location]
  const lastLocation = locations[0]
 if (lastLocation?.coords && !(Math.abs(lastLocation.coords.latitude - location.coords.latitude) > 0.0001 || Math.abs(lastLocation.coords.longitude - location.coords.longitude) > 0.0001)) {
    return locations;
  }
  return [location, ...locations];
}