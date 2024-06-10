import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl, BackHandler, TouchableOpacity } from "react-native";
import SingleLocalComponent from "../SingleLocalComponent";
import CustomActivityIndicator from "../ActivityIndicator";
import { useLocalsFilterStore } from "../../store/useFiltersStore";

function LocalsListing({
  data,
  pullRefresh,
  onRefresh,
  onEndReach,
  scrollNotStarted,
  setScrollNotStarted
}) {
  const ref = useRef(null)
  const { filterApplyClicked, setFilterApplyClicked } = useLocalsFilterStore();
  const { navigate } = useNavigation()

  useEffect(() => {
    if (filterApplyClicked && data?.length) {
      ref.current?.scrollToIndex({
        animated: true,
        index: 0,
      })
      setFilterApplyClicked(false)
    }
  }, [filterApplyClicked, data])


  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (!scrollNotStarted && data?.length) {
          ref.current?.scrollToIndex({
            animated: true,
            index: 0,
          })
          setScrollNotStarted(true)
          return true
        }
        return false
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [scrollNotStarted, data])
  );

  const renderLocal = useCallback(({ item }) => {
    return (

      <SingleLocalComponent local={item} />
    )
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        // windowSize={5}
        // initialNumToRender={3}
        // initialListSize={3}
        // maxToRenderPerBatch={3}

        ref={ref}
        removeClippedSubviews
        data={data}
        contentContainerStyle={{ gap: 30 }}
        keyExtractor={((item, index) => index.toString())}
        renderItem={renderLocal}
        // keyboardShouldPersistTaps='handled'
        onEndReached={onEndReach}
        onMomentumScrollBegin={() => setScrollNotStarted(false)}
        onEndReachedThreshold={0}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={pullRefresh} onRefresh={onRefresh} />}
        // ListEmptyComponent={<CustomActivityIndicator />}
        ListFooterComponent={data?.length && <CustomActivityIndicator />}
      />
    </View>

  );
}
export default memo(LocalsListing)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  singlePlace: {
    paddingLeft: 30,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 12,
    borderColor: '#c3c3c3',
    borderBottomWidth: 1
  }
})