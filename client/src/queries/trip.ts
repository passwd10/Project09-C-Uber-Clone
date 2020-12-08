import { gql } from '@apollo/client';

export const CANCEL_TRIP = gql`mutation cancelCall($id:ID!){
  cancelTrip(id:$id){
    id
    result
  }
}`;

export const GET_TRIP_STATUS = gql`query getStatus($id:ID!){
  tripStatus(id:$id)
}`;

export const GET_PICK_UP_POSITION = gql`query pickUpPos($id:ID!){
  trip(id:$id){
    origin{
      latitude
      longitude
    }
  }
}`;

export const GET_ORIGIN_POSITION_AND_DESTINATION_POSITION = gql`query getOriginPositionAndDestinationPostion($id:ID!){
  trip(id:$id){
    origin{
      latitude
      longitude
    }
    destination{
      latitude
      longitude
    }
  }
}`;

export const ADD_TRIP_STATUS = gql`
  mutation setTripStatus($tripId: ID!, $newTripStatus: String!) {
    setTripStatus(tripId:$tripId, newTripStatus:$newTripStatus) {
      result
    }
  }
`;
