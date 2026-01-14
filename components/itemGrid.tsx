import React from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { useProducts } from '../hooks/useProducts';

// Added onViewItem to your existing prop structure
const ItemGrid = ({ category, searchQuery = '', onViewItem }: { category: string; searchQuery?: string; onViewItem: (item: any) => void }) => {
  const { items, isLoading } = useProducts(category);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center py-20">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  const filteredItems = items?.filter((item: any) => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  const gridItems = filteredItems.slice(0, 30);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.card}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentSection}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          
          <Text style={styles.category}>
            Category: {category}
          </Text>

          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => onViewItem(item)} // Triggers the display
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