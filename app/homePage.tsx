import { router } from "expo-router";
import { Text, View, Image, Pressable, ScrollView, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SegmentedControl from "@/components/ui/segmentedControlFilters";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomBar from "@/components/ui/bottomBar"; 
const home = require('../assets/images/home.png')
const list = require('../assets/images/list.png')
const faq = require('../assets/images/faq.png')

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState("All");
    const insets = useSafeAreaInsets();

    const handlePress = (): void => {
        console.log(activeTab);
        
    }

    function goToList() {
        console.log("not yet implemented ");
        
    }

    function goToHome() {
        console.log("nav to home ");
    }

    function goToFaq() {
        console.log("nav to faq ");
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
            <BottomBar 
                icons={[home,faq,list]}
                onFaq={() => console.log('FAQ')}
                onHome={() => console.log('Home')}
                onList={() => console.log('List')}
            />
        </View>
    )
}

