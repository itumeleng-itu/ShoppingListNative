import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const STORAGE_KEY = '@shopping_list';

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  image: string;
  quantity: number;
  checked: boolean;
  addedAt: number;
}

interface ShoppingListContextType {
  listItems: ShoppingItem[];
  addItem: (item: { id: string; name: string; category: string; image: string }) => void;
  removeItem: (id: string) => void;
  toggleChecked: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearList: () => void;
  clearChecked: () => void;
  itemCount: number;
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider = ({ children }: { children: React.ReactNode }) => {
  const [listItems, setListItems] = useState<ShoppingItem[]>([]);

  // Load list from AsyncStorage on mount
  useEffect(() => {
    const loadList = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setListItems(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load shopping list:', e);
      }
    };
    loadList();
  }, []);

  // Persist list whenever it changes
  const persistList = useCallback(async (items: ShoppingItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save shopping list:', e);
    }
  }, []);

  const addItem = useCallback((item: { id: string; name: string; category: string; image: string }) => {
    setListItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      let updated: ShoppingItem[];
      if (existing) {
        updated = prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        Alert.alert('Updated', `${item.name} quantity increased`);
      } else {
        updated = [...prev, { ...item, quantity: 1, checked: false, addedAt: Date.now() }];
        Alert.alert('Added', `${item.name} added to your list`);
      }
      persistList(updated);
      return updated;
    });
  }, [persistList]);

  const removeItem = useCallback((id: string) => {
    setListItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      persistList(updated);
      return updated;
    });
  }, [persistList]);

  const toggleChecked = useCallback((id: string) => {
    setListItems(prev => {
      const updated = prev.map(i =>
        i.id === id ? { ...i, checked: !i.checked } : i
      );
      persistList(updated);
      return updated;
    });
  }, [persistList]);

  const incrementQuantity = useCallback((id: string) => {
    setListItems(prev => {
      const updated = prev.map(i =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      );
      persistList(updated);
      return updated;
    });
  }, [persistList]);

  const decrementQuantity = useCallback((id: string) => {
    setListItems(prev => {
      const item = prev.find(i => i.id === id);
      if (item && item.quantity <= 1) {
        const updated = prev.filter(i => i.id !== id);
        persistList(updated);
        return updated;
      }
      const updated = prev.map(i =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
      persistList(updated);
      return updated;
    });
  }, [persistList]);

  const clearList = useCallback(() => {
    Alert.alert(
      'Clear List',
      'Are you sure you want to remove all items?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            setListItems([]);
            persistList([]);
          },
        },
      ]
    );
  }, [persistList]);

  const clearChecked = useCallback(() => {
    setListItems(prev => {
      const updated = prev.filter(i => !i.checked);
      persistList(updated);
      return updated;
    });
  }, [persistList]);

  const itemCount = listItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShoppingListContext.Provider
      value={{
        listItems,
        addItem,
        removeItem,
        toggleChecked,
        incrementQuantity,
        decrementQuantity,
        clearList,
        clearChecked,
        itemCount,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};
