import React, { useState, useEffect, createContext } from 'react'
import { getLocations, recordTripLocations, saveTrip } from '../../utils/local-storage'
import moment from 'moment'
import { clearLocations, recordLocations, setActiveTripIdentifier } from '../../utils/local-storage';
import { getCurrentLocation, buildUpdatedLocationArray } from '../../utils/location';
import { getCurrentWeather } from '../../utils/weather';

export const dataContext = createContext()

const INITIAL_TRIP_OBJECT = {
  start_date: null, // moment
  end_date: null, //moment
  identifier: null, // moment
  locations: null,
}

const DataProivder = ({ children }) => {
  const [locations, setLocations] = useState([])
  const [currentWeather, setCurrentWeather] = useState(null)
  const [trip, setTrip] = useState(INITIAL_TRIP_OBJECT)
  const [currentMoment, setCurrentMoment] = useState(null)

  useEffect(() => {
    const checkForExistingLocationsData = async () => {
      if (locations?.length === 0) {
        const existing = await getLocations()
        if (existing?.length > 0) setLocations(existing)
      }
    }
    checkForExistingLocationsData()
    const interval = setInterval(getLocation, 3000)
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    const getCurretMoment =  () => {
      const curr = moment()
      setCurrentMoment(curr)
    }
    const timeInterval = setInterval(getCurretMoment, 300)
    return () => clearInterval(timeInterval)
  }, []);

  useEffect(() => {

    if (trip.identifier && locations.length % 5 === 0) {
      recordLocations(locations)
      recordTripLocations(trip.identifier, locations)
    }
  }, [trip, locations])

  const fetchCurrentWeather = (city, countryCode) => {
    getCurrentWeather(city, countryCode).then((res) => {
      setCurrentWeather(res.data)
    })
  }

  const startTrip = async () => {
    const newTrip = {
      start_date: moment(),
      end_date: null,
      identifier: `${moment().format("ddmmyyyyhhmm")}`
    }
    await setActiveTripIdentifier(newTrip.identifier)
    await saveTrip(newTrip)
    setTrip(newTrip)
  }

  const endTrip = async () => {
    setTrip(INITIAL_TRIP_OBJECT)
    recordLocations(locations)
    setLocations([])
    await clearLocations()
  }

  const getLocation = async () => {
    try {
      const location = await getCurrentLocation()
      await setLocations((locations) => buildUpdatedLocationArray(locations, location, trip))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <dataContext.Provider value={{
      locations,
      trip,
      currentWeather,
      currentMoment,
      setLocations,
      startTrip,
      endTrip,
      fetchCurrentWeather,
    }}>
      {children}
    </dataContext.Provider>
  )
}

export default DataProivder