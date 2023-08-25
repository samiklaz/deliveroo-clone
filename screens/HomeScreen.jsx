/* eslint-disable prettier/prettier */
import {Text, View, SafeAreaView, Image, StatusBar, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { ChevronDownIcon} from "react-native-heroicons/solid";
import { UserIcon, AdjustmentsHorizontalIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";

import { s } from "react-native-wind";
import Categories from '../components/Categories';
import FeatureRow from '../components/FeatureRow';
import client from '../sanity';

const HomeScreen = () => {
  const navigation = useNavigation()
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    client.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }`).then(data => {
        setFeaturedCategories(data)
      })

  }, [])
  
  return (
    <SafeAreaView style={s`bg-white flex-1`}>
      <StatusBar backgroundColor="white" barStyle='dark-content' />

      {/* Header  */}
      <View style={s`flex-row pb-3 items-center px-4 mt-3`}>
        <Image 
          source={{
            uri: "https://links.papareact.com/wru"
          }}
          style={s`h-7 w-7 bg-gray-300`}
        />

        <View style={s`ml-2 flex-1`}>
          <Text style={s`font-bold text-gray-400 text-xs`}>Deliver Now!</Text>
          <Text style={s`font-bold text-xl text-black items-center`}>Current Location 
          <ChevronDownIcon size={20} color="#00CCB8" />
          </Text>
        </View>

        <TouchableOpacity><UserIcon size={30} color="#00CCB8" /></TouchableOpacity>
      </View>

      {/* Search */}
      <View style={s`flex-row items-center space-x-2 pb-2 px-4`}>
        <View style={s`flex-row space-x-2 bg-gray-200 p-3 items-center flex-1 mr-2`}>
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput 
            placeholder='Restaurants and Cuisines' 
            keyboardType='default'
            style={s`py-0`}
          />
        </View>
          <TouchableOpacity>
          <AdjustmentsHorizontalIcon color="#00CCB8" />
          </TouchableOpacity>
        
      </View>

      {/* Body */}
      <ScrollView style={s`bg-gray-100 flex-1`} contentContainerStyle={{ paddingBottom: 10}}>
        {/* Categories */}
        <Categories />

        {/* Features */}
        {featuredCategories?.map((category) => (
          <FeatureRow 
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        )      
        )}
        

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
