import AsyncStorage from '@react-native-async-storage/async-storage';
import { isEmpty, uniqBy } from 'lodash';

export const setActiveTripIdentifier = async (identifier) => {
  try {
    await AsyncStorage.setItem('@active_trip', identifier)
  } catch (e) {
    console.error('Unable to start trip')
  }
}

export const getActiveTripIdentifier = async () => {
  try {
    const value = await AsyncStorage.getItem('@active_trip')
    return value
  } catch (e) {
    console.error('Unable to get trip identifier')
    return null
  }
}

export const getLocations = async () => {
  try {
    const value = await AsyncStorage.getItem('@locations')
    return JSON.parse(value)
  } catch (e) {
    console.error('Unable to get trip identifier')
    return null
  }
}



export const recordLocations = async (locations) => {
  try {
    const existingLocations = await getLocations()
    if (existingLocations) {
      const newLocations = uniqBy([
        ...existingLocations,
        ...locations
      ], 'timestamp')
      await AsyncStorage.setItem('@locations', JSON.stringify(newLocations))
      return
    }
    await AsyncStorage.setItem('@locations', JSON.stringify(locations))

  } catch (e) {
    console.error(e)
  }
}


export const clearLocations = async () => {
  try {
    await AsyncStorage.removeItem('@locations')
  } catch (e) {
    console.error('Unable to delete location data')
  }
}

export const setApplicationDocument = async (object) => {
  try {
    await AsyncStorage.setItem('@moto-hud-storage', JSON.stringify(object))
  } catch (e) {
    console.error('Unable to check for initialization')
    return null
  }
}

export const getApplicationDocument = async () => {
  try {
    const value = await AsyncStorage.getItem('@moto-hud-storage')
    if (isEmpty(value)) {
      await setApplicationDocument({
        trips: []
      })
      return { trips: [] }
    }
    return JSON.parse(value)
  } catch (e) {
    console.error('Unable to check for initialization')
    return null
  }
}

export const findTrip = (document, tripIdentifier) => {
  try {
    return document.trips.find((trip) => trip.identifier === tripIdentifier)
  } catch (e) {
    console.error(e)
  }
}

export const recordTripLocations = async (tripIdentifier, locations) => {
  try {
    const document = getApplicationDocument()
    const trip = await findTrip(document, tripIdentifier)
    let newLocations = locations
    if (trip?.locations) {
      newLocations = uniqBy([
        ...existingLocations,
        ...locations
      ], 'timestamp')
    }
    const updatedDoc = {
      ...document,
      trips: uniqBy([...document.trips, {
        ...trip,
        locations: newLocations
      }], 'identifier')
    }
    await AsyncStorage.setItem('@moto-hud-storage', JSON.stringify(updatedDoc))

  } catch (e) {
    console.error(e)
  }
}

export const saveTrip = async (trip) => {
  const document = await getApplicationDocument()
  const updatedDocument = {
    ...document,
    trips: [...document.trips, trip]
  }
  try {
    await AsyncStorage.setItem('@moto-hud-storage', JSON.stringify(updatedDocument))
  } catch (e) {
    console.error('Unable to start trip')
  }
}