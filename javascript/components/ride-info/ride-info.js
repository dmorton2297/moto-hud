import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import CurrentLocation from '../current-location';
import RiderInformation from '../rider-information';
import WeatherReport from '../weather-report';

const RideInfo = () => {
  return (
    <View style={styles.container}>
      <WeatherReport />
      <CurrentLocation />
      <RiderInformation />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'gray',
  },
});

export default RideInfo;

