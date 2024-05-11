import { GraphQLError } from 'graphql';
import { CV_ADDED, CV_DELETED, CV_UPDATED } from '../events';
import { AddCvInput, Context, CvSkill, Id, Input, UpdateCvInput } from '../types';
import { PrismaClient } from '@prisma/client';

async function verifyUser(user: string | undefined, prisma: PrismaClient) {
    if (user) {
        const existingUser = await prisma.user.findUnique({
            where: { id: user },
        });
        if (!existingUser) {
            throw new GraphQLError('User does not exist');
        }
    }
}

async function createCvSkills(
    cv: string,
    skills: string[] | undefined,
    prisma: PrismaClient,
): Promise<CvSkill[] | null> {
    if (!skills) {
        return null;
    }

    const cvSkills: CvSkill[] = [];

    // Check if all skills exist
    if (skills.length === 0) {
        return cvSkills;
    }

    const uniqueSkills = skills.filter((value, index, array) => array.indexOf(value) === index);

    const allSkillsExist = await prisma.skill
        .findMany({
            where: { id: { in: uniqueSkills } },
        })
        .then((skills) => skills.length === uniqueSkills.length);

    if (!allSkillsExist) {
        throw new GraphQLError('One or more skills do not exist');
    }

    cvSkills.push(...uniqueSkills.map((skill) => ({ cv, skill })));

    return cvSkills;
}

export const Mutation = {
    addCv: async (_parent: unknown, { input }: Input<AddCvInput>, { prisma, pubSub }: Context) => {
        const { user, skills, ...data } = input;

        await verifyUser(user, prisma);

        const cv = { id: crypto.randomUUID(), ...data };
        const cvSkills = await createCvSkills(cv.id, skills, prisma);

        // Create CV entry
        const newCv = await prisma.cv.create({
            data: {
                ...cv,
                user: { connect: { id: user } }, // Connect CV to user
                skills: {
                    create: cvSkills!.map((skill) => ({
                        skill: { connect: { id: skill.skill } }, // Connect CV to skill
                    })),
                },
            },
        });

        pubSub.publish(CV_ADDED, newCv);

        return newCv;
    },

    updateCv: async (_parent: unknown, { input }: Input<UpdateCvInput>, { prisma, pubSub }: Context) => {
        const { id, user, skills, ...data } = input;

        const existingCv = await prisma.cv.findUnique({
            where: { id },
        });

        if (!existingCv) {
            throw new GraphQLError('CV not found');
        }

        await verifyUser(user, prisma);

        const cvSkills = await createCvSkills(id, skills, prisma);

        const updatedCv = await prisma.cv.update({
            where: { id },
            data: { ...data, user: user ? { connect: { id: user } } : undefined },
        });

        if (cvSkills) {
            await prisma.cvSkill.deleteMany({ where: { cv: { id } } });
            await prisma.cvSkill.createMany({
                data: cvSkills.map((cvSkill) => ({
                    cvId: cvSkill.cv,
                    skillId: cvSkill.skill,
                })),
            });
        }

        pubSub.publish(CV_UPDATED, updatedCv);

        return updatedCv;
    },

    deleteCv: async (_parent: unknown, { id }: Id, { prisma, pubSub }: Context) => {
        const cv = await prisma.cv.findUnique({ where: { id } });

        if (!cv) {
            throw new GraphQLError('Cv not found');
        }

        const deleteCvSkills = prisma.cvSkill.deleteMany({
            where: {
                cvId: cv.id,
            },
        });
        const deleteCv = prisma.cv.delete({ where: { id } });

        await prisma.$transaction([deleteCvSkills, deleteCv]);

        pubSub.publish(CV_DELETED, cv);

        return cv;
    },
};
