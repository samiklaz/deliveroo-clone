/* eslint-disable prettier/prettier */
import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'

import { s } from "react-native-wind";

const Categories = () => {
  return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
            paddingHorizontal: 15, paddingTop: 10,
        }}
    >
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 1" />
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 2" />
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 3"  />
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 3"  />
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 3"  />
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 3"  />
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 3"  />
        <CategoryCard imgUrl="https://links.papareact.com/gn7" title="Test 3"  />

    </ScrollView>
  )
}

export default Categories