
export const driverCall = gql`mutation driverCall($driverIds: [String], $riderId: String, $origin: String, $destination: String){
  driverCall(driverIds:$driverIds, riderId:$riderId, origin:$origin, destination: $destination){
    driverIds
    riderId
    origin
    destination
  }
}`;
