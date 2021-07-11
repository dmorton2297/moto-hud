import React from 'react';
import { View, StyleSheet } from 'react-native';
import LocationTracker from './javascript/components/location-tracker'
import RideInfo from './javascript/components/ride-info';
import Actions from './javascript/components/actions';
import DataProivder from './javascript/providers/data-provider/data-provider';

const App = () => {
  return (
    <DataProivder>
      <View style={styles.container}>
        <LocationTracker />
        <View style={styles.subContainer}>
          <RideInfo />
          <Actions />
        </View>
      </View>
    </DataProivder>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  subContainer: {
    display: 'flex',
    height: '100%',
    flexGrow: 1.6
  }
})

export default App
