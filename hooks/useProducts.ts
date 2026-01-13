import { useState, useEffect } from 'react';
import { getItemsByCategory } from '../constants/GroceryService';

    interface Product {
        id: string;
        name: string;
        category: string;
        image: string;
        }

export const useProducts = (category: string) => {
    const[items, setItems] = useState<Product[]>([]) //list of items by category of type Product[]
    const [isLoading, setIsLoading] = useState(true); //load state



    useEffect(() =>{
        const loadData = async () =>{
            setIsLoading(true)
            const data = await getItemsByCategory(category);

            setItems(data);
            setIsLoading(false); //hide the loading
        }
        loadData(); //invoke the asynchronous function
    }, [category]);
    return { items, isLoading };
}