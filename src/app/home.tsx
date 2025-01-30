import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { api } from "@/service/api"
import { Categories, CategoriesProps } from "@/components/categories";


export default function Home(){
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    async function fetchCategories() {
        try{
            const { data } = await api.get('/categories');
            setCategories(data);
            setSelectedCategory(data[0].id);
        } catch (error) {
            console.log(error);
            Alert.alert("Categorias", "Não foi possível carregar as categorias");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={{flex: 1}}>
            <Categories data={categories} onSelect={setSelectedCategory} selected={selectedCategory}/>
        </View>
    )
}