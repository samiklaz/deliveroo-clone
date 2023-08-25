/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, {useMemo, useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { s } from 'react-native-wind'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import { USDollar } from '../utils'

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsinBasket, setGroupedItemsinBasket] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
      const groupedItems = items.reduce((results, item) => {
        (results[item.id] = results[item.id] || []).push(item)
        return results
      }, {})

      setGroupedItemsinBasket(groupedItems)
    }, [items])

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      <View style={s`flex-1 bg-gray-100`}>
        <View style={s`p-5 border-b border-[#00CCB8] bg-white shadow-xs, { borderColor: "#00CCB8",`}>
          <View>
            <Text style={s`text-lg font-bold text-center`}>Basket</Text>
            <Text style={s`text-center text-gray-400`}>{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s`rounded-full bg-gray-100 absolute top-3 right-3`}
          >
            <XCircleIcon color="#00CCB8" height={50} width={50} />
          </TouchableOpacity>

        </View>

        <View style={s`flex-row items-center space-x-4 px-4 py-3 bg-white my-5`}>
          <Image 
            source={{
              uri: "https://links.papareact.com/wru"
            }}
            style={s`h-7 w-7 bg-gray-300 p-4 rounded-full`}
          />

          <Text style={s`flex-1 pl-4`}>
            Deliver in 50-75 mins
          </Text>
          <TouchableOpacity>
            <Text style={{ color: '#00CCB8'}}>Change</Text>
          </TouchableOpacity>
        </View>


        <ScrollView style={s`divide-y divide-gray-200`}>
          {Object.entries(groupedItemsinBasket).map(([key, items]) => 
            (
            <View key={key} style={s`flex-row items-center space-x-3 bg-white py-2 px-5`}>
              <Text style={s`pr-3 text-green-500`}>{items.length} x</Text>
              <Image 
                source={{ uri: urlFor(items[0].image).url() }}
                style={s`h-12 w-12 rounded-full pr-3`}
              />
              <Text style={s`flex-1 pl-3`}>{items[0]?.name}</Text>
              <Text style={s`text-gray-600 pr-3 `}>
                {USDollar.format(items[0]?.price)}
              </Text>

              <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key}))}>
                <Text style={s`text-xs text-green-500`}>Remove</Text>
              </TouchableOpacity>
              
            </View>
          )
          )}
        </ScrollView>

        <View style={s`p-5 bg-white space-y-4`}>
          <View style={s`flex-row justify-between  p-y-2`}>
            <Text style={s`text-gray-400`}>Subtotal</Text>
            <Text style={s`text-gray-400`}>
                {USDollar.format(basketTotal)}
            </Text>
          </View>

          <View style={s`flex-row justify-between py-2`}>
            <Text style={s`text-gray-400`}>Delivery Fee</Text>
            <Text style={s`text-gray-400`}>
                $5.99
            </Text>
          </View>

          <View style={s`flex-row justify-between py-2`}>
            <Text style={s`text-black`}>Order Total</Text>
            <Text style={s`font-extrabold`}>
                $5.99
            </Text>
          </View>

          <TouchableOpacity style={s`rounded-lg p-3 bg-green-500 mt-3`} onPress={() => navigation.navigate("PreparingOrder")}>
            <Text style={s`text-center text-white text-lg font-bold`}>Place Order</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default BasketScreen