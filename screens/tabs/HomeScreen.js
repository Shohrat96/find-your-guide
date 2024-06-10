import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import { StatusBar } from "expo-status-bar";
import useFetchLocals from "../../hooks/useFetchLocals";
import LocalsListing from "../../components/LocalsListing";
import CustomActivityIndicator from "../../components/ActivityIndicator";
import { memo, useEffect, useState } from "react";
import FilterScreen from "./FilterScreen";
import { useLocalsFilterStore } from "../../store/useFiltersStore";
import { useLocalsStore } from "../../store/useLocalsStore";


function HomeScreen({ route }) {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [pullRefresh, setPullRefresh] = useState(false)
  const [scrollNotStarted, setScrollNotStarted] = useState(true)
  const { navigate } = useNavigation();
  const { lat, lng, placeId } = route?.params || {};
  const { filters, setFilters, setFilterApplyClicked } = useLocalsFilterStore();

  const { offset } = filters;
  const {
    setLocalsData,
    refreshLocalsData,
    loadMoreLocalsData
  } = useFetchLocals(lat, lng, placeId, filters);

  useEffect(() => {
    setLocalsData().then((success) => {
      setFilterApplyClicked(true)
    })
  }, [placeId])


  const { locals, localsLoading } = useLocalsStore()


  const onRefresh = async () => {
    setPullRefresh(true)
    const res = await refreshLocalsData()
    setPullRefresh(false)
  }

  const onLoadMore = () => {
    if (!scrollNotStarted) {
      setFilters({ offset: filters?.offset + 12 })

    } else {
      console.log('dont load more')
    }
  }

  useEffect(() => {
    if (!scrollNotStarted) {
      const loadMoreDataOnScroll = async () => {
        const res = await loadMoreLocalsData()
      }
      loadMoreDataOnScroll()
    }

  }, [offset])



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header
        title="Find Your Guide"
        description="Discover the World Through Local Eyes"
        screen="HomeScreen"
      />
      <View style={styles.headerViewContainer}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => {
          navigate('SearchLocationScreen')
        }}>
          <SearchBar
            placeholder="Search"
            value={route?.params?.formatted_address ?? ''}
            navigateOnPress
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userAvatar} onPress={() => { setShowFilterModal(true) }}>
          <Ionicons name="filter" size={18} color={"#000"} />
        </TouchableOpacity>
      </View>
      {localsLoading && <CustomActivityIndicator size="large" />}
      {locals &&
        <LocalsListing
          data={locals?.guides}
          pullRefresh={pullRefresh}
          onRefresh={onRefresh}
          onEndReach={onLoadMore}
          scrollNotStarted={scrollNotStarted}
          setScrollNotStarted={(val) => setScrollNotStarted(val)}
        />
      }
      {showFilterModal && <FilterScreen
        isVisible={showFilterModal}
        setIsVisible={setShowFilterModal}
        locationData={{ lat, lng, placeId }}
      />}
    </SafeAreaView>
  );
}

export default memo(HomeScreen)

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
    marginBottom: 20
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