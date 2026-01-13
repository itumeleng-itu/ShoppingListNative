import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics'; // Optional: npx expo install expo-haptics
const home = require('../../assets/images/home.png')
const list = require('../../assets/images/list.png')
const faq = require('../../assets/images/faq.png')

interface NavItemProps {
  icon: any;
  label: string;
  onPress: () => void;
}

const NavButton = ({ icon, label, onPress }: NavItemProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9); // Shrink slightly
  };

  const handlePressOut = () => {
    scale.value = withSpring(1); // Spring back
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // iOS tactile feel
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      className="items-center justify-center px-6"
    >
      <Animated.View style={[animatedStyle, styles.iconContainer]}>
        <Image source={icon} className="w-7 h-7" resizeMode="contain" />
      </Animated.View>
      <Text className="text-white text-[10px] font-bold mt-1 tracking-widest">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const BottomBar = ({ onFaq, onHome, onList, icons }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      className="bg-white/20 border-t border-white/10 flex-row justify-around items-center pt-3"
    >
      <NavButton icon={faq} label="FAQ" onPress={onFaq} />
      <NavButton icon={home} label="HOME" onPress={onHome} />
      <NavButton icon={list} label="LIST" onPress={onList} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  }
});

export default BottomBar;