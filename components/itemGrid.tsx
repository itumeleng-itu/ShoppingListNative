import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useProducts } from '../hooks/useProducts';

const ItemGrid = ({ category }: { category: string }) => {
  const { items, isLoading } = useProducts(category);

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-20">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  // Limit to 4 items for a 2x2 grid
  const gridItems = items?.slice(0, 30) || [];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.card}>
        
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          resizeMode="cover"
        />

        {/* Product Info - Bottom section */}
        <View style={styles.contentSection}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          
          <Text style={styles.category}>
            Category: {category}
          </Text>

          {/* White button matching your screenshot */}
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              View
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={gridItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  itemContainer: {
    width: '48.5%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  contentSection: {
    padding: 12,
  },
  productName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  category: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    width: 60
  },
  buttonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default ItemGrid;