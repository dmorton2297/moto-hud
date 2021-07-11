import React, { useContext } from 'react'
import { Button, View, Image, Text } from 'react-native'
import { dataContext } from '../../providers/data-provider/data-provider';

const WeatherReport = () => {

  const { currentWeather, fetchCurrentWeather, locations } = useContext(dataContext)
  const icon = currentWeather?.weather[0].icon
  const lastLocation = locations[0]

  if (!lastLocation) return <></>
  const { city, countryCode } = lastLocation

  const calculateFarenheit = (kelvin) => {
    return `${Math.round((kelvin - 273.15) * (9 / 5) + 32)} F`
  }
  return (
    <View style={{backgroundColor: 'white'}}>
      {icon &&
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image
            source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }}
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'black'
            }}
          />
          <View style={{paddingRight: 20, paddingLeft: 20, paddingTop: 10}}>
            <Text><Text style={{ fontWeight: "bold" }}>Temp</Text> {calculateFarenheit(currentWeather.main.temp)}</Text>
            <Text><Text style={{ fontWeight: "bold" }}>Max Temp</Text> {calculateFarenheit(currentWeather.main['temp_max'])}</Text>
            <Text><Text style={{ fontWeight: "bold" }}>Min Temp</Text> {calculateFarenheit(currentWeather.main['temp_min'])}</Text>
          </View>
        </View>
      }
      <Button
        title="Fetch Weather Report"
        onPress={() => fetchCurrentWeather(city, countryCode)}
      />
    </View>
  )
}

export default WeatherReport;
