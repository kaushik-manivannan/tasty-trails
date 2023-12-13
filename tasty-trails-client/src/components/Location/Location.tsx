import React, { useState, FC, useEffect } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import  {UseFormRegister, UseFormSetValue } from "react-hook-form";
import {PostFormData} from "../../interfaces/post-interfaces";
import styles from "./Location.module.scss";
import { useTranslation } from 'react-i18next';
interface PlacesAutocompleteProps {
  register:UseFormRegister<PostFormData>;
  errors: {
    description?: {
      message?: string;
    };
    location?: {
      message?: string;
    };
  };
  setValue: UseFormSetValue<PostFormData>;
}
/**
 * 
 * This compent is used for storing the Location of the post.
 * This component has google maps api integrated so there will be suggestions for the location.
 * 
 */
const Location: FC<PlacesAutocompleteProps> = ({ register, errors={},setValue }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDEEtydl2CIiv3yNhJiQ8T124H6hke56nU", // Replace with your API key
    libraries: ["places"],
  });
  
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  
  const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);
  
  // Function to trigger when the user selects a location
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const location = place.geometry?.location;
  
      if (location) {
        setLatitude(() => {
          setValue('latitude', location.lat()); // Update form value for latitude
          return location.lat();
        });
  
        setLongitude(() => {
          setValue('longitude', location.lng()); // Update form value for longitude
          return location.lng();
        });
      } else {
        setLatitude(()=>{
          setValue('latitude', 0); 
          return 0;
        });
        setLongitude(() => {
          setValue('longitude',0);
          return 0;
        });
      }
    }
  };
  useEffect(() => {
  }, [latitude, longitude]);
  const { t } = useTranslation();
  return (
    <>
      {isLoaded && (
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder={t('Enter the location of your food')}
            {...register("location", { required: "Enter the location of your food" })}
            className={styles.input}
          />
        </Autocomplete>
      )}
      {errors.location && <p className={styles.errorMessage}>{errors.location.message}</p>}
      <input type="hidden" {...register("latitude")} value={latitude}></input>
      <input type="hidden"  {...register("longitude")} value={longitude}></input>
    </>
  );  
}
export default Location;
