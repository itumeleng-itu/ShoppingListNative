import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';

interface ItemDetailModalProps {
  visible: boolean;
  item: {
    id: string;
    name: string;
    category: string;
    image: string;
  } | null;
  onClose: () => void;
  onAddToList: () => void;
}

const ItemDetailModal = ({ visible, item, onClose, onAddToList }: ItemDetailModalProps) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Blurred Background */}
      <BlurView intensity={20} className="flex-1">
        <Pressable className="flex-1 bg-black/40 justify-center items-center" onPress={onClose}>
          <Pressable className="w-[80%] max-w-[350px]" onPress={(e) => e.stopPropagation()}>
            
            {/* Cyan/Blue Border matching your screenshot */}
            <View className="border-4 border-cyan-500 rounded-2xl overflow-hidden bg-white">
              
              {/* Large Product Image */}
              <Image 
                source={{ uri: item.image }} 
                className="w-full aspect-square"
                resizeMode="cover"
              />

              {/* Product Details Section */}
              <View className="p-4 bg-green-50 flex-row justify-between items-center">
                <View className="flex-1 mr-3">
                  <Text className="text-lg font-bold text-black mb-1" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {item.category}
                  </Text>
                </View>

                {/* Add to List Button */}
                <TouchableOpacity 
                  className="bg-green-400 rounded-lg py-2.5 px-4"
                  activeOpacity={0.8}
                  onPress={onAddToList}
                >
                  <Text className="text-black font-semibold text-xs">
                    Add to list
                  </Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
};

export default ItemDetailModal;