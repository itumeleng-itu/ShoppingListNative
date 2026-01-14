import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Keyboard, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onClear?: () => void;
  onSearch?: () => void;
}



const SearchBar = ({ searchQuery, onSearchChange, onClear, onSearch }: SearchBarProps) => {
  const insets = useSafeAreaInsets();
  const keyboardOffset = useSharedValue(0);

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardShowListener = Keyboard.addListener(showEvent, (e) => {
      // Move the search bar up by the keyboard height minus the bottom bar height
      const keyboardHeight = e.endCoordinates.height;
      keyboardOffset.value = withTiming(keyboardHeight - 60, { duration: 250 });
    });

    const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
      keyboardOffset.value = withTiming(0, { duration: 250 });
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    bottom: insets.bottom + 70 + keyboardOffset.value,
  }));

  const handleClear = () => {
    onSearchChange('');
    onClear?.();
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        animatedStyle
      ]}
    >
      <View style={styles.neumorphicContainer}>
        
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            placeholderTextColor="#ffffffff"
            value={searchQuery}
            onChangeText={onSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={onSearch}
          />
          
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={handleClear} 
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={styles.searchButton}
          onPress={onSearch}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    zIndex: 100,
  },
  neumorphicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    shadowColor: 'white',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff81',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: 'white',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: 'green',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'green',
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: 8,
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff81',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'green',
  },
});

export default SearchBar;