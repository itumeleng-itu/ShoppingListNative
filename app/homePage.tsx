import { router } from "expo-router";
import { Text, View, Image, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SegmentedControl from "@/components/ui/segmentedControlFilters";
import { useState } from "react";
const pic = require('../assets/images/index.png')

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState("All");


    const handleOptionPress = (option: string) => { 
    };

    const renderContent = ()=>{
        switch (activeTab) {
            case "Food":
                return <Text className="text-white">🍎 Grocery Items List</Text>;
            case "Bath":
                return <Text className="text-white">🧼 Soap and Shampoo</Text>;
            case "Wash":
                return <Text className="text-white">🧺 Laundry Detergent</Text>;
            default:
                return <Text className="text-white">📦 Showing All Items</Text>;
        }
    }

    return (
        <View className="flex-1 items-center justify-center bg-green-700 gap-3">
            <Text className="text-6xl text-white ">Shopping List</Text>
            <SegmentedControl options={["All", "Food","Bath","Wash"]} 
            selectedOption={activeTab} 
            onOptionPress={(option)=> setActiveTab(option)} />
            <View mt-10>

            <Animated.View 
                key={activeTab} 
                entering={FadeInDown.duration(400)} 
                className="w-full px-6 items-center"
            >
                {activeTab === "All" && (
                    <View>
                        <Text className="text-white text-xl">📦 Showing all essentials...</Text>
                        <Text className="text-white text-xl">📦 Showing all essentials...</Text>
                        <Text className="text-white text-xl">📦 Showing all essentials...</Text>
                    </View>
                )}
                {activeTab === "Food" && (
                <Text className="text-white text-xl">🍎 Fresh produce & snacks</Text>
                )}
                {activeTab === "Bath" && (
                <Text className="text-white text-xl">🧼 Toiletries & Skincare</Text>
                )}
                {activeTab === "Wash" && (
                <Text className="text-white text-xl">🧺 Cleaning supplies</Text>
                )}
            </Animated.View>
            </View>
        </View>
    )
}

