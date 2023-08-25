/* eslint-disable prettier/prettier */
import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'

import { s } from "react-native-wind";
import { ArrowRightIcon} from "react-native-heroicons/outline";
import RestaurantCard from './RestaurantCard';
import client from '../sanity';

const FeatureRow = ({id, title, description, featuredCategory}) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    client.fetch(`
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        },
      }[0]
    `, {id: id }).then(data => {
      setRestaurants(data?.restaurants)
    })
  }, [id])

  return (
    <View>
      <View style={s`mt-4 flex-row items-center justify-between px-4`}>
        <Text style={s`font-bold text-lg text-black`}>{title}</Text>
        <ArrowRightIcon color="#00CCB8" />
      </View>

      <Text style={s`text-xs text-gray-500 px-4`}>{description}here</Text>


      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={s`pt-4`}
      >


          {/* Restaurant Cards */}
          {restaurants?.map((restaurant) => (
            <RestaurantCard 
              key={restaurant._id}
              id={restaurant._id}
              imgUrl = {restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              short_description="This is a test description"
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          ))}
          



      </ScrollView>
    </View>
  )
}

export default FeatureRow