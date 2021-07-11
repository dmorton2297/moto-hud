import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { dataContext } from '../../providers/data-provider/data-provider';

const LocationTracker = () => {
  const { trip, locations } = useContext(dataContext)

  const latitude = locations[0]?.coords?.latitude
  const longitude = locations[0]?.coords?.longitude

  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  const allCoordinates = locations.map((loc) => ({
    latitude: loc.coords.latitude, longitude: loc.coords.longitude
  }))
  

  return (
    <View style={styles.container}>
      {(locations.length > 0) &&
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
        >
          <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
            <View style={styles.currentMarker}>
            </View>
          </Marker>
          {trip.identifier && <Polyline
            coordinates={allCoordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={6}
          />}
        </MapView>
      }
      {locations.length === 0 &&
        <ActivityIndicator size="large" color="#00ff00" />
      }

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexGrow: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentMarker: {
    padding: 6,
    borderRadius: 2,
    backgroundColor: 'black'
  }
});

export default LocationTracker;

