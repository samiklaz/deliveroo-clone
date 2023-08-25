/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { s } from "react-native-wind";
import { MapPinIcon} from "react-native-heroicons/outline";
import { StarIcon} from "react-native-heroicons/solid";
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';


const RestaurantCard = ({id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat}) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={s`bg-white mr-3 shadow`} onPress={() => navigation.navigate("Restaurant", {
        id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
    })}> 

    <Image 
        source={{ uri: urlFor(imgUrl).url() }}
        style={s`h-36 w-64 rounded`}
    />
        <View style={s`px-3 pb-4`}>
            <Text style={s`font-bold text-lg pt-2`}>{title}</Text>
            <View style={s`flex-row items-center space-x-1`}>
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text style={s`text-xs text-gray-500`}>
                    <Text style={s`text-green-500`}>{rating}</Text> . {genre} 
                </Text>
            </View>

            <View style={s`flex-row items-center space-x-1`}>
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text style={s`text-xs text-gray-500`}>Nearby . {address}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard