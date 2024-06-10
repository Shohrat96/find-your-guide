import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckList from '../../../components/CheckList';
import Modal from '../../../components/Modal';
import RangleSlider from '../../../components/RangleSlider';
import { BoldMedium, BoldText, BoldTextUnderline } from '../../../components/StyledText';
import { ACTIVITY_TYPES } from './activityTypesData';
import { LANGUAGES } from './filterData';
import { GENDERS } from './genders';
import { useLocalsFilterStore } from '../../../store/useFiltersStore';
import useFetchLocals from '../../../hooks/useFetchLocals';

export default function ({ setIsVisible, isVisible, locationData }) {
  const { filters, setFilters, filterApplyClicked, setFilterApplyClicked } = useLocalsFilterStore();
  // const [filterApplied, setFilterApplied] = useState(false)


  const { priceRange, selectedLanguageIds, selectedActivityIds, selectedGenderIds } = filters;
  const { lng, lat, placeId } = locationData;
  const {
    setLocalsData,
  } = useFetchLocals(lat, lng, placeId);

  const [selectedData, setSelectedData] = useState({
    languages: [],
    activities: [],
    genders: [],
    priceRange: [0, 100]
  })

  useEffect(() => {
    setSelectedData({
      languages: selectedLanguageIds,
      activities: selectedActivityIds,
      genders: selectedGenderIds,
      priceRange
    })
  }, [])

  const filterNotApplied = useMemo(() => selectedData?.priceRange[0] === 0 &&
    selectedData?.priceRange[1] === 100 &&
    [...selectedData?.languages, ...selectedData?.activities, ...selectedData?.genders]?.length === 0, [selectedData])

  const applyFilterHandler = () => {
    setFilters({
      selectedLanguageIds: selectedData?.languages,
      selectedActivityIds: selectedData?.activities,
      selectedGenderIds: selectedData?.genders,
      priceRange: selectedData?.priceRange
    })
    setFilterApplyClicked(true)
  }

  useEffect(() => {
    if (filterApplyClicked) {
      setLocalsData()
      setIsVisible(false)
      // setFilterApplyClicked(false)
    }
  }, [filterApplyClicked])

  const changeSelectedData = useCallback((filterType, idOrRange) => {
    if (filterType === 'priceRange') {
      setSelectedData(prevState => ({
        ...prevState,
        priceRange: idOrRange
      }))
      return
    }
    setSelectedData(prevState => ({
      ...prevState,
      [filterType]: prevState[filterType]?.includes(idOrRange)
        ? prevState[filterType].filter(item => item !== idOrRange)
        : [...prevState[filterType], idOrRange]
    }));
  }, []);


  const clearAllFilters = () => {
    setSelectedData({
      languages: [],
      activities: [],
      genders: [],
      priceRange: [0, 100]
    });
  }
  const renderActions = useCallback(() => {
    return (
      <>
        <TouchableOpacity style={styles.cancelBtn} onPress={clearAllFilters}>
          <BoldTextUnderline>Clear all</BoldTextUnderline>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={applyFilterHandler}>
          <BoldText style={{ color: '#fff' }}>{filterNotApplied ? "Show all" : "Apply"}</BoldText>
        </TouchableOpacity>
      </>
    )
  }, [selectedData])

  return (
    <Modal actions={renderActions} headerTitle={"Filter"} isVisible={isVisible} setIsVisible={setIsVisible}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.filterItem, styles.priceRange]}>
            <BoldMedium>Price</BoldMedium>
            <RangleSlider priceRange={selectedData?.priceRange} setSelectedData={(range) => changeSelectedData('priceRange', range)} />
          </View>
          <ScrollView
            contentContainerStyle={styles.filterContentContainer}
            style={styles.languages}>
            <BoldMedium>Languages</BoldMedium>
            <CheckList data={LANGUAGES} selectedData={selectedData.languages} setSelectedData={(id) => changeSelectedData('languages', id)} />
          </ScrollView>

          <ScrollView style={styles.activities} contentContainerStyle={styles.filterContentContainer}>
            <BoldMedium>Activities</BoldMedium>
            <CheckList data={ACTIVITY_TYPES} selectedData={selectedData.activities} setSelectedData={(id) => changeSelectedData('activities', id)} />
          </ScrollView>

          <ScrollView style={styles.genders}>
            <BoldMedium>Genders</BoldMedium>
            <CheckList data={GENDERS} selectedData={selectedData.genders} setSelectedData={(id) => changeSelectedData('genders', id)} />
          </ScrollView>

        </ScrollView>
      </SafeAreaView>

    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  filterItem: {
    paddingVertical: 10,
    gap: 16,
  },
  filterContentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    paddingBottom: 24
  },
  priceRange: {
  },
  languages: {
    marginBottom: 24,
  },
  activities: {
    marginBottom: 24
  },

  cancelBtn: {
    backgroundColor: '#fff'
  },
  applyBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  }
})