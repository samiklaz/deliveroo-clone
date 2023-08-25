/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { s } from 'react-native-wind'
import { XMarkIcon } from 'react-native-heroicons/solid'

import * as Progress from 'react-native-progress';
import MapView, {Marker} from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)

  return (
    <View style={s`bg-green-300 flex-1`}>
      <SafeAreaView style={s`z-50`}>
        <View style={s`flex-row justify-between items-center p-5`}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <XMarkIcon color="white" size={30} />
            </TouchableOpacity>
            <Text style={s`font-light text-white text-lg font-extrabold`}>Order Help</Text>
        </View>

        <View style={s`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
            <View style={s`flex-row justify-between`}>
                <View>
                    <Text style={s`text-lg text-gray-400`}>Estimated Arrival</Text>
                    <Text style={s`text-4xl font-bold`}>45-55 Minutes</Text>
                </View>

                <Image 
                    source={{
                        uri: "https://links.papareact.com/fls"
                    }}
                    style={s`h-20 w-20`}
                />
            </View>

            <Progress.Bar size={30} color="#00CCB8" indeterminate={true} />
            <Text style={s`mt-3 text-gray-500`}>
                Your order at {restaurant.title} is being prepared
            </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={s`flex-1 -mt-10 z-0`}
          mapType="mutedStandard"
      >
        <Marker 
            
        />
      </MapView>
    </View>
  )
}

export default DeliveryScreen