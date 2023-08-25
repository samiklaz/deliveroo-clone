/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { s } from 'react-native-wind'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice'

const DishRow = ({id, name, description, price, image}) => {
  const [isPressed, setIsPressed] = useState(false)

  const items = useSelector((state) => selectBasketItemsWithId(state, id))
  const dispatch = useDispatch() 

  const addItemToBasket = () => {
      dispatch(addToBasket({id, name, description, price, image}))
  }

  const removeItemFromBasket = () => {
    if(!items.length > 0) return
    dispatch(removeFromBasket({id}))
  }

  return (
    <>
    <TouchableOpacity style={s`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`} onPress={() => setIsPressed(!isPressed)}>
      <View style={s`flex-row`}>
        <View style={s`flex-1 pr-2`}>
            <Text style={s`text-lg mb-1`}>{name}</Text>
            <Text style={s`text-gray-500`}>{description}</Text>
            <Text style={s`text-gray-400 mt-2`}>${price}</Text>
        </View>

        <View>
          <Image 
              source={{
                  uri: urlFor(image).url()
              }}
              style={[s`h-20 w-20 bg-gray-300 p-4`, styles.image]}
          />
        </View>
      </View>
      
    </TouchableOpacity>

    {isPressed && (
      <View style={s`bg-white px-4 `}>
        <View style={s`flex-row items-center space-x-2 pb-3`}>
          <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length}>
            <MinusCircleIcon 
              color={items.length > 0 ? "#00CCBD" : "gray"}
              size={40}
              // color="#00CCB8"
            />
          </TouchableOpacity>

          <Text style={s`ml-2 mr-2`}>{items.length}</Text>

          <TouchableOpacity onPress={addItemToBasket}>
            <PlusCircleIcon 
              size={40}
              color="#00CCB8"
            />
          </TouchableOpacity>
        </View>
      </View>
    )}
    </>
  )
}

export default DishRow

const styles = StyleSheet.create({
    image: {
      borderWidth: 1,
      borderColor: "#F3F3F4"
    },
  });