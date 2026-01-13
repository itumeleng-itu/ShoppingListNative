import { router } from "expo-router";
import { Text, View, Image, Pressable } from "react-native";
const pic = require('../assets/images/index.png')

export default function HomeScreen() {
  const goToHome = () => {
     router.push('/homePage')
  };

  return (
    

      <View className="flex-1 items-center justify-center bg-green-700" >
        <Pressable onPress={goToHome}>
        <Image source={pic} />
        </Pressable>
        <Text className="text-6xl text-white">Shopping List</Text>
        <Text className="italic bold text-lg text-white mb-5">manage & plan your shopping.</Text>
        <Text className=" absolute bottom-0 italic bold text-lg text-white m-5 ">Click grocery image to begin.</Text>
      </View>

  )
}