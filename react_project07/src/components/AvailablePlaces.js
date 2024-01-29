import { useState, useEffect } from 'react';
import Places from './Places';


export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([])


  useEffect(()=>{

    async function fetchPlaces () {
      setIsFetching(true);
    const response = await fetch('http://localhost:30000/places');
    const resData = await response.json();
    setAvailablePlaces(resData.places)
    setIsFetching(false);
    }


    fetchPlaces();
  }, [])


  
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      fallbackText="No places available."
      loadingText = "fetching places data...."
      onSelectPlace={onSelectPlace}
    />
  );
}
