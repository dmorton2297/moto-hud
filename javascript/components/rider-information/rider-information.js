import React from 'react'
import { Text, View } from 'react-native'

const RiderInformation = () => {
  return (
    <View style={{backgroundColor: 'orange', paddingBottom: 10, paddingTop: 10, paddingLeft: 20 }}>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>Rider Information</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Full Name:  </Text>Dan Morton</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Address:  </Text>949 N Willard Ct, Chicago, IL</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Emergency Phone Number:  </Text>(847) 529-1900</Text>
      <Text><Text style={{fontWeight: 'bold'}}>Emergency Contact Name:  </Text>Adriana Davila</Text>
    </View>
  )
}

export default RiderInformation
