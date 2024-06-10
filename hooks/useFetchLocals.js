import { useState, useEffect } from 'react';
import axios from 'axios';
import { EXPO_PUBLIC_LOCALS_URL } from "@env"
import { useLocalsFilterStore } from '../store/useFiltersStore';
import { LANGUAGES } from '../screens/tabs/FilterScreen/filterData';
import { ACTIVITY_TYPES } from '../screens/tabs/FilterScreen/activityTypesData';
import { GENDERS } from '../screens/tabs/FilterScreen/genders';
import { useLocalsStore } from '../store/useLocalsStore';

const MIN_PAY_PER_HOUR = 0;
const MAX_PAY_PER_HOUR = 100;

export default function useFetchLocals(lat, lng, placeId) {
  const { locals, setLocals, setLocalsLoading, scrollToAddLocals } = useLocalsStore();

  // const [localsError, setLocalsError] = useState(null);
  // const [localsLoading, setLocalsLoading] = useState(false);
  const [pullToRefresh, setPullToRefresh] = useState(false);
  const [scrollToRefresh, setScrollToRefresh] = useState(false);

  const { filters, setFilters } = useLocalsFilterStore();

  const { priceRange, selectedLanguageIds, selectedActivityIds, selectedGenderIds, offset } = filters;

  const generateFilterPartOfQuery = () => {
    const result = ['?currency=USD', 'limit=12', `offset=${offset}`]
    if (priceRange[0] !== MIN_PAY_PER_HOUR) {
      result.push(`priceFrom=${priceRange[0]}`)
    }
    if (priceRange[1] !== MAX_PAY_PER_HOUR) {
      result.push(`priceTo=${priceRange[1]}`)
    }
    if (selectedActivityIds?.length > 0) {
      const selectedActivities = selectedActivityIds?.map(id => ACTIVITY_TYPES?.find(item => item?.id === id)?.slug)
      const stringForm = selectedActivities?.join(',')
      result.push(`activities=${stringForm}`)
    }
    if (selectedLanguageIds?.length > 0) {
      const selectedLangs = selectedLanguageIds?.map(id => LANGUAGES?.find(item => item?.id === id)?.title?.toLowerCase())
      const stringForm = selectedLangs?.join(',')
      result.push(`languages=${stringForm}`)
    }
    if (selectedGenderIds?.length > 0) {
      const selectedGenders = selectedGenderIds?.map(id => GENDERS?.find(item => item?.id === id)?.title?.toLowerCase())
      const stringForm = selectedGenders?.join(',')
      result.push(`gender=${stringForm}`)
    }
    if (lat) {
      result.push(`lat=${lat}`)
    }
    if (lng) {
      result.push(`lon=${lng}`)
    }
    if (placeId) {
      result.push(`placeId=${placeId}`)
    }
    const finalQuery = result?.join('&')
    return finalQuery
  }

  const fetchData = async () => {

    try {
      const response = await axios.post(`${EXPO_PUBLIC_LOCALS_URL}${generateFilterPartOfQuery()}`);
      return response?.data
    } catch (error) {
      setLocalsError(error);
    }
  };

  const refreshLocalsData = async () => {
    const guidesData = await fetchData()
    setLocals(guidesData);
  }

  const setLocalsData = async () => {
    setLocals([])
    setLocalsLoading(true);
    const guidesData = await fetchData()
    setLocals(guidesData);
    setLocalsLoading(false)
    return guidesData
  }

  const loadMoreLocalsData = async () => {
    // setLocalsLoading(true);
    const guidesData = await fetchData()
    scrollToAddLocals(guidesData?.guides);
  }

  // useEffect(() => {
  //   console.log('lat or lng changed: ', lat, lng)
  //   setLocalsData();

  //   return () => {
  //   };
  // }, [lat, lng]);

  return {
    setLocals,
    setLocalsData,
    refreshLocalsData,
    pullToRefresh,
    loadMoreLocalsData,
    setPullToRefresh,
    scrollToRefresh,
    setScrollToRefresh
  };
};