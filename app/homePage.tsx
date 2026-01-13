import { router } from "expo-router";
import { Text, View, Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SegmentedControl from "@/components/ui/segmentedControlFilters";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context"; 
const home = require('../assets/images/home.png')

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState("All");
    const insets = useSafeAreaInsets();

    const handlePress = (): void => {
        console.log(activeTab);
        
    }

    return (
        <View className="flex-1 bg-green-700 gap-3" style = {{paddingTop: insets.top}}> 

            <View className="items-center justify-center mt-5 gap-3">
                <Text className="text-6xl text-white ">Shopping List</Text>
                <SegmentedControl options={["All", "Food","Bath","Wash"]} 
                    selectedOption={activeTab} 
                    onOptionPress={(option)=> setActiveTab(option)} />
            </View>
            <ScrollView className="flex-1"
                contentContainerStyle={{ 
                    paddingHorizontal: 24, 
                    paddingBottom: insets.bottom + 20 
                }}>
            <Animated.View 
                key={activeTab} 
                entering={FadeInDown.duration(400)} 
                className="w-full px-2 items-center"
            >
                {/* i should make this as a separate component ( renderItems)) */}
                {activeTab === "All" && (
                    <View>
                        <Text className="text-white text-xl"></Text>  
                    </View>
                )}
                {activeTab === "Food" && (
                    <View>
                        <Text className="text-white text-xl"></Text>     
                    </View>
                )}
                {activeTab === "Bath" && (
                    <View>
                        <Text className="text-white text-xl"></Text>  
                    </View>
                )}
                {activeTab === "Wash" && (
                    <View>
                        <Text className="text-white text-xl"></Text>   
                    </View>
                )}
            </Animated.View>
            </ScrollView>
            <View className="bg-white/30  pt-4 px-8 flex-row justify-between items-center"
                    style={{ paddingBottom: Math.max(insets.bottom, 20) }}>

                        <TouchableOpacity className="items-center pt-4 px-8">
                            <Pressable 
                                className="w-6 h-6 bg-white rounded-full mb-1"
                                onPress={()=>{handlePress()}} >
                            </Pressable>
                            <Text className="text-white text-[10px] font-bold">FAQ</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity className="items-center pt-4 px-8">
                            <Pressable 
                                className="w-6 h-6 mb-1"
                                onPress={()=>{handlePress()}} >
                                    <Image source={home} className="h-6 w-6"/>
                            </Pressable>
                            <Text className="text-white text-[10px] font-bold">HOME</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="items-center pt-4 px-8">
                            <Pressable 
                                className="w-6 h-6 bg-white rounded-full mb-1"
                                onPress={()=>{handlePress()}} >
                            </Pressable>
                            <Text className="text-white text-[10px] font-bold">LIST</Text>
                        </TouchableOpacity>
            </View>
        </View>
    )
}

