import BottomBar from '@/components/ui/bottomBar';
import { useShoppingList } from '@/hooks/useShoppingList';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight, Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const home = require('../assets/images/home.png');
const listIcon = require('../assets/images/list.png');
const faq = require('../assets/images/faq.png');

export default function ListScreen() {
  const insets = useSafeAreaInsets();
  const {
    listItems,
    removeItem,
    toggleChecked,
    incrementQuantity,
    decrementQuantity,
    clearList,
    clearChecked,
    itemCount,
  } = useShoppingList();

  const checkedCount = listItems.filter(i => i.checked).length;
  const uncheckedItems = listItems.filter(i => !i.checked);
  const checkedItems = listItems.filter(i => i.checked);

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Remove Item', `Remove "${name}" from your list?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeItem(id) },
    ]);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 60).duration(300)}
      layout={Layout.springify()}
      style={styles.itemRow}
    >
      {/* Checkbox */}
      <Pressable
        onPress={() => toggleChecked(item.id)}
        style={[styles.checkbox, item.checked && styles.checkboxChecked]}
      >
        {item.checked && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      {/* Product Image */}
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      {/* Item Details */}
      <View style={styles.itemInfo}>
        <Text
          style={[styles.itemName, item.checked && styles.itemNameChecked]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => decrementQuantity(item.id)}
          style={styles.qtyButton}
          activeOpacity={0.7}
        >
          <Text style={styles.qtyButtonText}>−</Text>
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.quantity}</Text>

        <TouchableOpacity
          onPress={() => incrementQuantity(item.id)}
          style={styles.qtyButton}
          activeOpacity={0.7}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Delete */}
      <TouchableOpacity
        onPress={() => handleDelete(item.id, item.name)}
        style={styles.deleteButton}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const ListHeader = () => (
    <View>
      {/* Header Stats */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{itemCount}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{checkedCount}</Text>
          <Text style={styles.statLabel}>Checked Off</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{listItems.length - checkedCount}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      {listItems.length > 0 && (
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.actionRow}>
          {checkedCount > 0 && (
            <TouchableOpacity
              onPress={clearChecked}
              style={styles.actionButton}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Clear Checked ({checkedCount})</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={clearList}
            style={[styles.actionButton, styles.clearAllButton]}
            activeOpacity={0.8}
          >
            <Text style={[styles.actionButtonText, styles.clearAllText]}>Clear All</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Unchecked section label */}
      {uncheckedItems.length > 0 && (
        <Text style={styles.sectionLabel}>To Get</Text>
      )}
    </View>
  );

  const SectionDivider = () => (
    <>
      {checkedItems.length > 0 && (
        <View style={styles.sectionDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.sectionLabel}>Done</Text>
          <View style={styles.dividerLine} />
        </View>
      )}
    </>
  );

  // Combine unchecked + divider + checked
  const combinedData = [
    ...uncheckedItems,
    ...(checkedItems.length > 0 ? [{ id: '__divider__', _isDivider: true }] : []),
    ...checkedItems,
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <Text style={styles.title}>My List</Text>
        <Text style={styles.subtitle}>
          {listItems.length === 0
            ? 'Your shopping list is empty'
            : `${listItems.length} item${listItems.length !== 1 ? 's' : ''} in your list`}
        </Text>
      </Animated.View>

      {listItems.length === 0 ? (
        /* Empty State */
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Nothing here yet</Text>
          <Text style={styles.emptySubtitle}>
            Browse products and tap "Add to list"{'\n'}to start building your shopping list
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            activeOpacity={0.8}
            onPress={() => router.push('/homePage')}
          >
            <Text style={styles.browseButtonText}>Browse Products</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        /* Shopping List */
        <FlatList
          data={combinedData}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => {
            if ((item as any)._isDivider) {
              return <SectionDivider />;
            }
            return renderItem({ item, index });
          }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 140,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <BottomBar
        icons={[home, faq, listIcon]}
        onFaq={() => router.push('/faq')}
        onHome={() => router.push('/homePage')}
        onList={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15803d', // green-700
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // Actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  clearAllButton: {
    backgroundColor: 'rgba(239,68,68,0.25)',
    borderColor: 'rgba(239,68,68,0.4)',
  },
  clearAllText: {
    color: '#fca5a5',
  },

  // Section labels
  sectionLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 4,
    marginLeft: 4,
  },
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  // List Item
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#4ade80',
    borderColor: '#4ade80',
  },
  checkmark: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: 'rgba(255,255,255,0.4)',
  },
  itemCategory: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    marginTop: 2,
  },

  // Quantity
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginRight: 8,
  },
  qtyButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    minWidth: 20,
    textAlign: 'center',
  },

  // Delete
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: 'rgba(239,68,68,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: '#fca5a5',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 28,
  },
  browseButtonText: {
    color: '#15803d',
    fontWeight: '700',
    fontSize: 15,
  },
});
