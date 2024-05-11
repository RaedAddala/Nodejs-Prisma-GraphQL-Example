import { CV_ADDED, CV_DELETED, CV_UPDATED } from '../events';
import { Context, Cv } from '../types';

export const Subscription = {
    cvAdded: {
        subscribe: (_parent: unknown, _args: unknown, { pubSub }: Context) =>
            pubSub.subscribe(CV_ADDED),
        resolve: (payload: Cv) => {
            return payload;
        },
    },
    cvUpdated: {
        subscribe: (_parent: unknown, _args: unknown, { pubSub }: Context) =>
            pubSub.subscribe(CV_UPDATED),
        resolve: (payload: Cv) => {
            return payload;
        },
    },
    cvDeleted: {
        subscribe: (_parent: unknown, _args: unknown, { pubSub }: Context) =>
            pubSub.subscribe(CV_DELETED),
        resolve: (payload: Cv) => {
            return payload;
        },
    },
};
