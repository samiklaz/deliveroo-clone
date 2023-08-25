/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, {useLayoutEffect, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { s } from 'react-native-wind'
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'

const RestaurantScreen = () => {
    const navigation = useNavigation()
    const [dispatch] = useDispatch()
    const {
        params: {
            id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
        },
    } = useRoute()

    useEffect(() => {
        dispatch(setRestaurant({
            id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat,
        }))
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])
  return (
    <>
    <BasketIcon />

    <ScrollView style={s``}>
        <View style={s`relative`}>
            <Image 
                source={{
                    uri: urlFor(imgUrl).url()
                }}
                style={s`w-full h-56 bg-gray-300 p-4`}
            />
            <TouchableOpacity style={s`absolute top-3 left-3 p-2 bg-gray-100 rounded-full`} onPress={() => navigation.goBack()}>
                <ArrowLeftIcon size={20} color="#00CCB8" />
            </TouchableOpacity>
        </View>

        <View style={s`bg-white`}>
            <View style={s`px-4 pt-4`}>
                <Text style={s`text-3xl font-bold text-black`}>{title}</Text>
                <View style={s`flex-row space-x-2 my-1`}>
                    <View style={s`flex-row items-center space-x-1 pr-4`}>
                        <StarIcon color="green" opacity={0.5} size={22} />
                        <Text style={s`text-xs text-gray-500`}>
                            <Text style={s`text-green-500 mr-2`}>{rating}</Text> - {genre}
                        </Text>
                    </View>

                    <View style={s`flex-row items-center space-x-1`}>
                        <MapPinIcon color="gray" opacity={0.4} size={22} />
                        <Text style={s`text-xs text-gray-500`}>
                            Nearby - {address}
                        </Text>
                    </View>
                </View>

                <Text style={s`text-gray-500 mt-2 pb-4`}>{short_description}</Text>
            </View>

            <TouchableOpacity style={s`flex-row items-center space-x-2 p-4 border-y border-gray-300`}>
                <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
                <Text style={s`pl-2 flex-1 text-sm font-bold text-black`}>
                    Have a food allergy?
                </Text>
                <ChevronRightIcon color="#00CCB8" />
            </TouchableOpacity>
        </View>

        <View style={s`pb-32`}>
            <Text style={s`px-4 pt-6 mb-3 font-bold text-xl text-black`}>
                Menu 
            </Text>

            {/* Dish rows */}

            {dishes.map((dish) => (
                <DishRow
                    key={dish._id}
                    id={dish._id}
                    name={dish.name}
                    description={dish.short_description}
                    price={dish.price}
                    image={dish.image}
                />
            ))}
        </View>
    </ScrollView>
    </>
  )
}

export default RestaurantScreen