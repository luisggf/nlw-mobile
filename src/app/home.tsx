import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { api } from "@/service/api"
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";

type MarketProps = PlaceProps & {}

export default function Home(){
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [places, setPlaces] = useState<MarketProps[]>([]);

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

    async function fetchPlaces() {
        try{
            if(!selectedCategory) return;
            const { data } = await api.get("/markets/category/" + selectedCategory);
            setPlaces(data);

        } catch(err){
            console.log(err);
            Alert.alert("Locais", "Não foi possível carregar os locais");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    // Chama a função fetchPlaces
    useEffect(() => {
        fetchPlaces();
    }, [selectedCategory]);
    
    return (
        <View style={{flex: 1}}>
            <Categories 
                data={categories} 
                onSelect={setSelectedCategory} 
                selected={selectedCategory}
            />
            <Places data={places} />
        </View>
    )
}