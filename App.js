/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import { store } from './store'
import { Provider } from 'react-redux'

import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer> 
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} options={{ presentation: "modal", headerShown: false}} />
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{ presentation: "modal", headerShown: false}} />
          <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ presentation: "modal", headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App