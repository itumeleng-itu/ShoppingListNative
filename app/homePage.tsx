import ItemDetailModal from "@/components/itemDetailModal";
import ItemGrid from "@/components/itemGrid";
import BottomBar from "@/components/ui/bottomBar";
import SearchBar from "@/components/ui/searchBar";
import SegmentedControl from "@/components/ui/segmentedControlFilters";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const home = require('../assets/images/home.png')
const list = require('../assets/images/list.png')
const faq = require('../assets/images/faq.png')

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState<any>(null); // State for onClick display
    const insets = useSafeAreaInsets();

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
                    paddingBottom: insets.bottom + 140 
                }}>
                <Animated.View 
                    key={activeTab} 
                    entering={FadeInDown.duration(400)} 
                    className="w-full"
                >
                    {/* Integrated onViewItem logic into your category check */}
                    <ItemGrid 
                        category={activeTab} 
                        searchQuery={searchQuery} 
                        onViewItem={(item) => setSelectedItem(item)} 
                    />
                </Animated.View>
            </ScrollView>

            <ItemDetailModal 
                visible={selectedItem !== null}
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onAddToList={() => {
                    // Add to list logic here
                    setSelectedItem(null);
                }}
            />

            <BottomBar 
                icons={[home,faq,list]}
                onFaq={() => router.push('/faq')}
                onHome={() => router.push('/homePage')}
                onList={() => router.push('/list')}
            />

            <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
        </View>
    )
}