import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SegmentedControlProps {
  options: string[];
  selectedOption: string;
  onOptionPress: (option: string) => void;
}

const SegmentedControl = ({
  options,
  selectedOption,
  onOptionPress,
}: SegmentedControlProps) => {
  const { width: windowWidth } = useWindowDimensions();
  
  const INTERNAL_PADDING = 4;
  const CONTAINER_WIDTH = windowWidth - 40; 
  const SEGMENT_WIDTH = (CONTAINER_WIDTH - INTERNAL_PADDING * 2) / options.length;

  const translateX = useSharedValue(0);

  useEffect(() => {
    const index = options.indexOf(selectedOption);
    translateX.value = withSpring(index * SEGMENT_WIDTH, {
      stiffness: 150,
      damping: 20,
      mass: 1,
    });
  }, [selectedOption, options, SEGMENT_WIDTH]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.container, { width: CONTAINER_WIDTH }]}>
      {/* Animated Background Pill */}
      <Animated.View
        style={[
          styles.activePill,
          { width: SEGMENT_WIDTH },
          animatedStyle,
        ]}
      />
      
      {/* Text Labels */}
      {options.map((option) => {
        const isActive = selectedOption === option;
        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.7}
            onPress={() => onOptionPress(option)}
            style={styles.tapTarget}
          >
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 22,
    padding: 4,
    alignItems: 'center',
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tapTarget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E0E0E0', // Unselected color
  },
  activeLabel: {
    color: '#333333', // Selected color (usually dark text on white)
  },
});

export default SegmentedControl;