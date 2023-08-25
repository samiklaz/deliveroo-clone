/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView } from 'react-native'
import React, {useEffect} from 'react'
import { s } from 'react-native-wind'

import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';


const PreparingOrderScreen = () => {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 4000)
    }, [])

  return (
    <SafeAreaView style={s`bg-green-300 flex-1 justify-center items-center`}>
        <Animatable.Image 
            source={require("../assets/order.gif")}
            animation="slideInUp"
            iterationCount={1}
            style={s`w-96 h-96`}
        />

        <Animatable.Text
            animation="slideInUp"
            iterationCount={1}
            style={s`text-lg my-10 text-white font-bold text-center`}
        >
            Waiting for restaurant to accept your order
        </Animatable.Text>

        <Progress.Bar size={30} color="#00CCB8" indeterminate={true} />

        
    </SafeAreaView>
  )
}

export default PreparingOrderScreen