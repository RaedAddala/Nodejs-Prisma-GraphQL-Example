import { GraphQLError } from 'graphql';
import { Context, Id } from '../types';

export const Query = {
    hello: () => 'Hello GL3',
    getCvs: (_parent: unknown, _args: unknown, { prisma }: Context) => {
        return prisma.cv.findMany();
    },
    getCvById: async (_parent: unknown, { id }: Id, { prisma }: Context) => {
        const cv = await prisma.cv.findUnique({ where: { id } });

        if (!cv) {
            throw new GraphQLError(` the cv you demanded of the id ${id} does not exist `);
        }

        return cv;
    },
};
