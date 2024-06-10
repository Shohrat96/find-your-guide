import { useState, useEffect } from 'react';
import axios from 'axios';
import { EXPO_PUBLIC_PLACE_DETAILS_API } from "@env"

export default function useFetchLocationDetails(placeId) {
  const [placeDetails, setPlaceDetails] = useState(null);
  const [placeDetailError, setPlaceDetailError] = useState(null);
  const [placeDetailsLoading, setPlaceDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setPlaceDetailsLoading(true);
      try {
        const response = await axios.get(`${EXPO_PUBLIC_PLACE_DETAILS_API}?placeId=${placeId}`);
        setPlaceDetails(response.data);
      } catch (error) {
        setPlaceDetailError(error);
      }
      setPlaceDetailsLoading(false);
    };

    fetchData();

    return () => {
    };
  }, [placeId]);

  return { placeDetails, setPlaceDetails, placeDetailError, placeDetailsLoading };
};