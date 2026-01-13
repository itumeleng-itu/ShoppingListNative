import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur'; // Ensure expo-blur is installed
import { Ionicons } from '@expo/vector-icons';

const AppleMusicBar = () => {
  return (
    <View className="absolute bottom-24 left-0 right-0 items-center px-4">
      {/* Container with shadow for depth */}
      <View className="w-full h-16 rounded-2xl overflow-hidden shadow-2xl">
        {/* iOS Glassmorphism Effect */}
        <BlurView intensity={80} tint="dark" className="flex-1 flex-row items-center px-3">
          
          {/* Album/Product Art */}
          <Image 
            source={{ uri: 'https://via.placeholder.com/45' }} 
            className="w-11 h-11 rounded-lg bg-gray-700"
          />

          {/* Text Content - Floating Search/Title Area */}
          <View className="flex-1 ml-3 justify-center">
            <Text className="text-white font-bold text-sm" numberOfLines={1}>
              MOLLY DOLLY
            </Text>
            <Text className="text-[#00FF00] text-xs" numberOfLines={1}>
              Jeune Lion
            </Text>
          </View>

          {/* Media/Search Controls */}
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity hitSlop={10}>
              <Ionicons name="pause" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={10}>
              <Ionicons name="play-forward" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
      
      {/* Sub-search bar if needed below mini-player (as per iOS 26 layout) */}
      <View className="w-full mt-2 h-12 rounded-2xl overflow-hidden shadow-xl">
         <BlurView intensity={40} tint="light" className="flex-1 flex-row items-center px-4">
            <Ionicons name="search" size={18} color="white" opacity={0.6} />
            <Text className="text-white/60 ml-3 text-sm">Votre bibliothèque</Text>
            <View className="flex-1 items-end">
                <Ionicons name="mic" size={18} color="white" opacity={0.6} />
            </View>
         </BlurView>
      </View>
    </View>
  );
};

export default AppleMusicBar;