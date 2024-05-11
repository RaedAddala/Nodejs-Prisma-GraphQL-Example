import { PrismaClient } from '@prisma/client';
import { createPubSub } from 'graphql-yoga';

export const context = {
    prisma: new PrismaClient(),
    pubSub: createPubSub(),
};
