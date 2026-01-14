import BottomBar from "@/components/ui/bottomBar";
import { router } from "expo-router";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const home = require('../assets/images/home.png')
const list = require('../assets/images/list.png')
const faq = require('../assets/images/faq.png')

export default function Feedback() {
    const insets = useSafeAreaInsets();


  function handleEmail() {
    Linking.openURL('mailto:support@grocerylistapp.com?subject=Note Recorder Feedback');
  }

  function handleRate() {
    // This would link to the app store in production
    Linking.openURL('https://play.google.com/store');
  }

  return (
    <View className="flex-1 bg-green-700 gap-5" style = {{paddingTop: insets.top}}>
      <View className="px-6 pt-1 pb-4 border-b mt-10 border-gray-100">
        <Text className="text-2xl font-bold text-white">Feedback & Support</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-6">

        <View className="bg-transparent border border-white rounded-[20px] p-6 mb-6">
          <Text className="text-lg font-semibold text-white mb-2">Grocery List App</Text>
          <Text className="text-sm text-white">Version 1.0.0</Text>
          <Text className="text-sm text-white mt-1">Your personal voice notes app</Text>
        </View>

        <Text className="text-xl font-semibold text-white mb-2 mt-2">Get in Touch</Text>

        <Pressable 
          onPress={handleEmail}
          className="bg-transparent border border-white rounded-[20px] rounded-xl p-4 mb-2 active:bg-gray-100"
        >
          <Text className="text-base font-semibold text-white">Send Feedback</Text>
          <Text className="text-sm text-white mt-1">
            Found a bug? Let us know!
          </Text>
        </Pressable>

        <Pressable 
          onPress={handleRate}
          className="bg-transparent border border-white rounded-[20px] rounded-xl p-4  active:bg-gray-100"
        >
          <Text className="text-base font-semibold text-white">Rate the App</Text>
          <Text className="text-sm text-white mt-1">
            Enjoying Grocery List App? Leave us a review!
          </Text>
        </Pressable>

        <Text className="text-base font-semibold text-white mb-4 mt-6">FAQs</Text>

        <View className="bg-transparent border border-white rounded-[20px] rounded-xl p-4 mb-2 active:bg-gray-100">
          <Text className="text-sm font-semibold text-white">How do I delete a list?</Text>
          <Text className="text-sm text-white mt-1">
            Tap the delete button on the far end of the list, then select confirm deletion.
          </Text>
        </View>

        <View className="bg-transparent border border-white rounded-[20px] rounded-xl p-4 active:bg-gray-100">
          <Text className="text-sm font-semibold text-white">Where are my lists stored?</Text>
          <Text className="text-sm text-white  mt-1">
            All grocery lists are stored locally on your device and persist even when the app is closed.
          </Text>
        </View>
      </ScrollView>

      <BottomBar 
                icons={[home,faq,list]}
                onFaq={() => router.push('/faq')}
                onHome={() => router.push('/homePage')}
                onList={() => router.push('/list')}
            />
    </View>
  );
}
