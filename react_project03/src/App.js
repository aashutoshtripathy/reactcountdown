import { useRef, useState,useEffect } from 'react';

import Places from './components/Places.js';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.js';
import DeleteConfirmation from './components/DeleteConfirmation.js';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js'

function App() {


  const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  const storePlaces = storeIds.map(id => AVAILABLE_PLACES.find((place) => place.id === id))



  const modal = useRef();
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [pickedPlaces, setPickedPlaces] = useState(storePlaces);


  // useEffect(() => {


  //   setPickedPlaces(storePlaces)
  // }, [])



  useEffect(() => {
     navigator.geolocation.getCurrentPosition((position) => {
    const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES,position.coords.longitude,position.coords.latitude);
    setAvailablePlaces(sortedPlaces);
  })
  }, [])
 

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false)
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  

  const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
  if (storeIds.indexOf(id) === -1) {
    localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storeIds]))
  }
}

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false)

    const storeIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storeIds.filter((id) => id !== selectedPlace.current)))


  }

  return (
    <>
      <Modal open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting Places by Distance......"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
