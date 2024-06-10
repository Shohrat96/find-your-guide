import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, NavigationProp, useNavigation } from "@react-navigation/native";

import { EXPO_PUBLIC_COUNTRIES_API } from "@env"
import useFetchLocationsData from "../../../hooks/useFetchData";
import SearchBar from "../../../components/SearchBar";
import { StatusBar } from "expo-status-bar";
import Header from "../../../components/Header";
import PlaceListing from "../../../components/PlaceListing";
import useFetchLocationDetails from "../../../hooks/useFetchLocationDetails";
import { useLocalsStore } from "../../../store/useLocalsStore";
import useFetchLocals from "../../../hooks/useFetchLocals";


export default function SearchLocationScreen() {
  const [selectedLocationId, setSelectedLocationId] = useState("");

  const { navigate } = useNavigation();
  const [search, setSearch] = useState("")
  const { setLocals } = useLocalsStore()
  const { data: locationData, setData: setLocationData, error, isLoading } = useFetchLocationsData(`${EXPO_PUBLIC_COUNTRIES_API}?s=${search}`)
  const { placeDetails } = useFetchLocationDetails(selectedLocationId)


  const handleSearch = (searchText) => {
    setSearch(searchText)
    if (searchText.trim() === '') setLocationData([])
  }

  const selectLocationHandler = useCallback((locationId) => {
    setSelectedLocationId(locationId)
  }, [])

  useEffect(() => {
    if (placeDetails) {
      const { lat, lng } = placeDetails?.geometry?.location
      navigate('HomeScreen', {
        lat,
        lng,
        formatted_address: placeDetails.formatted_address,
        placeId: selectedLocationId
      })
      setLocals({})
    }
  }, [placeDetails, navigate, selectedLocationId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header
        title="Explore"
        description="Find your next destionation..."
        canGoBack
        screen="HomeScreen"
      />
      <View style={styles.headerViewContainer}>

        <SearchBar
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
          defaultFocus
        />
        <TouchableOpacity style={styles.userAvatar} onPress={() => { }}>
          <Ionicons name="filter" size={18} color={"#000"} />
        </TouchableOpacity>
      </View>
      <PlaceListing onLocationSelect={selectLocationHandler} data={locationData} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  headerViewContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  flatListContainer: {
    gap: 12,
    marginTop: 24
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center'
  },

},
);