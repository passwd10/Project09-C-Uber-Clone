import React from 'react';

import { LoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
const libraries: Libraries = ['places'];

import PickUpMap from '../components/containers/PickUpMap';
import DriverInfoBox from '../components/containers/DriverInfoBox';

function RiderPickUpPage() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY} libraries={libraries}>
      <PickUpMap isRider={true}/>
      <DriverInfoBox />
    </LoadScript>
  );
}

export default RiderPickUpPage;
