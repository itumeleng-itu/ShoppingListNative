import groceryData from '../ProductData.json'


//mock api to fetch data from ProductData
export const getItemsByCategory = async(category: string) =>{
    await new Promise((resolve)=> setTimeout(resolve,400));

    if(category === "All") {
        return groceryData
    }
    return groceryData.filter(item => item.category === category)
}

export const getItemsById = async(id: string) =>{
    await new Promise((resolve)=> setTimeout(resolve,400));

    return groceryData.filter(item => item.id === id)
}