import moment from 'moment'
import React, { useContext, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { dataContext } from '../../providers/data-provider/data-provider'

const CurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null)
  const { locations, currentMoment } = useContext(dataContext)

  useEffect(() => {
    const current = locations[0]
    if (current?.city && current?.city.length > 0) {
      setCurrentLocation(current)
    }
  }, [locations])
  if (!currentLocation) return <></>
  return (
    <View style={{backgroundColor: 'white', paddingTop: 10, paddingBottom: 10, paddingLeft: 20}}>
      <Text style={{fontSize: 24}}>{currentLocation.city}, <Text style={{fontWeight: 'bold'}}>{currentLocation.countryCode}</Text></Text>
      {currentMoment && <Text>{currentMoment.format("ddd MMM yyyy")} - <Text style={{fontWeight: 'bold'}}>{currentMoment.format('hh:mm:ss A')}</Text></Text>}
    </View>
  )
}

export default CurrentLocation
