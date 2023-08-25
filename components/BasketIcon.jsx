/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import { s } from 'react-native-wind'
import { USDollar } from '../utils'



const BasketIcon = () => {

    const items = useSelector(selectBasketItems)
    const navigation = useNavigation()

    const basketTotal = useSelector(selectBasketTotal)

  if (items.length == 0) return null
    
  return (
    <View style={s`absolute bottom-0 w-full z-50`}>
      <TouchableOpacity style={s`bg-[#00CCBD] mx-5 p-4 rounded-lg flex-row items-center space-x-1 bottom-3 bg-green-700`} onPress={() => navigation.navigate("Basket")}>
        <Text style={s`text-white font-extrabold text-lg bg-green-600 px-2`}>{items.length}</Text>
        <Text style={s`flex-1 text-white font-extrabold  text-lg text-center`}>View Basket</Text>
        <Text style={s`text-lg text-white font-extrabold`}>{USDollar.format(basketTotal)}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon

const styles = StyleSheet.create({
    color: {
        backgroundColor: "#00CCBD",
    }
})