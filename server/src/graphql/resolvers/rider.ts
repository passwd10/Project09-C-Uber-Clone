import { withFilter } from 'apollo-server-express';
import { Rider } from '../../services';

import { DRIVER_RESPONDED, CALL_REQUESTED } from '../subscriptions';

interface LoginPayload{
  email:string;
  password:string;
}

interface createRiderArgs {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

interface DriverCallArgs {
  riderId: string;
  driverId: string;
  origin: string;
  destination: string;
  state: string;
}

const MATCHED_RIDER_STATE = 'MATCHED_RIDER_STATE';

export default {
  Query: {
    async rider(parent: any, args: { email: string }, context: any, info: any) {
      return await Rider.getRiderInfo({ email: args.email });
    },
  },
  Mutation: {
    async loginRider(_: any, payload:LoginPayload, context) {
      return await Rider.login(context, payload);
    },
    async createRider (parent: any, payload: createRiderArgs, context: any) {
      return await Rider.signup(payload);
    },
    driverCall(parent:any, args: DriverCallArgs, context:any) {
      context.pubsub.publish(CALL_REQUESTED, { driverListen: args });
      return args;
    },
    async notifyRiderState(parent: any, args: any, context: any) {
      context.pubsub.publish(MATCHED_RIDER_STATE, { matchedRiderState: args });
      return true;
    },
  },
  Subscription: {
    matchedRiderState: {
      subscribe: withFilter(
        (_, __, context) => context.pubsub.asyncIterator([MATCHED_RIDER_STATE]),
        (payload, variables) => {
          return payload.matchedRiderState.tripId === variables.tripId;
        },
      ),
    },
    driverResponded: {
      subscribe: withFilter((parent, args, context) => {
        return context.pubsub.asyncIterator([DRIVER_RESPONDED]);
      },
      (payload, variables, context) => {
        return payload.driverResponded.riderId === context.data.currentUser.data._id.toString();
      },
      ),
    },
  },
};
