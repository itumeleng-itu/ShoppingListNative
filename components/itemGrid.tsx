import React from 'react';
import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native';
import { useProducts } from '../hooks/useProducts';

const ItemGrid = ({ category }: { category: string }) => {
  const { items, isLoading } = useProducts(category);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-20">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  // Ensure we only show 9 items (3x3 grid)
  const gridItems = items.slice(0, 9);

  const renderItem = ({ item }: { item: any }) => (
    <View className="w-[31.33%] mb-4">
      <View className="bg-white/10 border border-white/5 rounded-3xl p-3">
        {/* Product Image */}
        <Image 
          source={{ uri: item.image }} 
          className="w-full aspect-square rounded-xl mb-2 bg-black/20"
          resizeMode="cover"
        />
        
        {/* Product Name */}
        <Text className="text-white font-semibold text-sm" numberOfLines={1}>
          {item.name}
        </Text>
        
        {/* Category Tag */}
        <Text className="text-white/40 text-[10px] uppercase tracking-wide mt-0.5">
          {item.category}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="px-3">
      <FlatList
        data={gridItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          gap: 1
        }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ItemGrid;