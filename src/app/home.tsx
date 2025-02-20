import { View, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import { api } from "@/service/api"
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import {fontFamily, colors} from "@/styles/theme"

type MarketProps = PlaceProps & {
    latitude: number;
    longitude: number;
}

export default function Home(){
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [places, setPlaces] = useState<MarketProps[]>([]);

    // location driven methods
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const coordinates = {
        latitude: -23.561187293883442,
        longitude: -46.656451388116494
    };

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

    async function getcoordinates() {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     getcoordinates();
    // }, [])

    useEffect(() => {
        fetchCategories();
    }, []);

    // Chama a função fetchPlaces
    useEffect(() => {
        fetchPlaces();
    }, [selectedCategory]);
    
    return (
        <View style={{flex: 1, backgroundColor: '#CECECE'}}>
            <Categories 
                data={categories} 
                onSelect={setSelectedCategory} 
                selected={selectedCategory}
            />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
          image={require('@/assets/location.png')}
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            identifier={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {place.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {place.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

     
            <Places data={places} />
        </View>
    )
}