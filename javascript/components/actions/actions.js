import React, { useContext } from 'react'
import { Button, StyleSheet, View } from 'react-native';
import { dataContext } from '../../providers/data-provider/data-provider';

const Actions = () => {
  const { startTrip, endTrip, trip } = useContext(dataContext)
  const tripInProgress = !!trip.identifier
  return (
    <View style={styles.container}>
      <Button color="red" title="Emergency Signal" onPress={() => console.log('emergency signal pressed')} />
      {tripInProgress &&
        <View style={styles.buttonContainer}>
          <Button color="orange" title="End Trip" onPress={endTrip} />
        </View>
      }
      {!tripInProgress &&
        <View style={styles.buttonContainer}>
          <Button title="Start Trip" onPress={startTrip} />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexGrow: 1,
  }
})

export default Actions;

