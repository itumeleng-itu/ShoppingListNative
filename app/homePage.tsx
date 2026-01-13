import { router } from "expo-router";
import { Text, View, ScrollView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SegmentedControl from "@/components/ui/segmentedControlFilters";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomBar from "@/components/ui/bottomBar";
import ItemGrid from "@/components/itemGrid"; 
import AppleMusicBar from "@/components/ui/appleMusicBar"; // Import the new component

const home = require('../assets/images/home.png')
const list = require('../assets/images/list.png')
const faq = require('../assets/images/faq.png')

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState("All");
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#00875A]" style={{ paddingTop: insets.top }}> 

            {/* Header Section */}
            <View className="items-center justify-center mt-5 gap-3">
                <Text className="text-5xl font-bold text-white tracking-tight">Grocery Items</Text>
                <SegmentedControl 
                    options={["All", "Food", "Bath", "Wash"]} 
                    selectedOption={activeTab} 
                    onOptionPress={(option) => setActiveTab(option)} 
                />
            </View>

            {/* Main Content Area */}
            <ScrollView 
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ 
                    paddingHorizontal: 16, 
                    // extra padding at bottom to avoid overlap with floating bars
                    paddingBottom: insets.bottom + 160 
                }}
            >
                <Animated.View 
                    key={activeTab} 
                    entering={FadeInDown.duration(400)} 
                    className="w-full"
                >
                    {/* Simplified Item Rendering */}
                    <ItemGrid category={activeTab}/>  
                </Animated.View>
            </ScrollView>

            {/* iOS 26 Apple Music Style Floating Search/Player Bar */}
            {/* Positioned exactly above the bottom bar */}
            <AppleMusicBar />

            {/* Global Bottom Navigation */}
            <BottomBar 
                icons={[home, faq, list]}
                onFaq={() => router.push('/faq')}
                onHome={() => router.push('/homePage')}
                onList={() => router.push('/list')}
            />
        </View>
    )
}