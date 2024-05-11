import { Context, Cv as CvType } from "../types";

export const Cv = {
  skills: async ({ id }: CvType, _args: unknown, { prisma }: Context) => {
    const skills = await prisma.cvSkill.findMany({
      where: { cvId: id },
      select: {
        skillId: true,
      },
    });
    const skillIds = skills.map((skill) => skill.skillId);
    const cvSkills = await prisma.skill.findMany({
      where: { id: { in: skillIds } },
    });
    return cvSkills;
  },

  user: ({ userId }: CvType, _args: unknown, { prisma }: Context) => {
    return prisma.user.findUnique({ where: { id: userId } });
  },
};

export const DeletedCv = {
  user: Cv.user,
};
