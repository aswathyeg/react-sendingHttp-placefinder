import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const[availablePlaces,setAvailablePlaces]=useState([]);
  const[isFetching,setIsFetching]=useState(false);
  const [ error,setError]=useState();
  useEffect(()=>{

    setIsFetching(true)
    async function fetchPlaces(){
      try{ 
        const response=await  fetch('http://localhost:3000/places');
        const resData= await response.json();

      if(!response.ok){
        throw new Error('Failed to fetch places')
      }
      setAvailablePlaces(resData.places);
    }catch(error){
      setError({message:error.message||'Could not fetch places,please try again later'});
    }
     
     
      setIsFetching(false)
    }
   
    fetchPlaces();

  },[]);
  if (error){
    return<Error title="An Error occurred" 
    message={error.message}/>
  }

  return (
    <Places
    loadingText="Fetching place data"
    isLoading={isFetching}
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
