import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.cvSkill.deleteMany({});
  await prisma.cv.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      id: "a5ddaa14-b0e0-4103-9a47-c29e3f5dd42b",
      name: "Grace",
      email: "magdalena-morozova@alice.biz",
      role: Role.ADMIN,
      cvs: {
        create: [
          {
            id: "c013edea-23e6-4d21-97af-1f92fda6c23f",
            name: "Grace",
            age: 58,
            job: "Human Web Consultant",
          },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      id: "7a031a53-10e0-42ba-b642-5022dfc657fc",
      name: "Purity",
      email: "somnuek-van-beek@web.info",
      role: Role.USER,
      cvs: {
        create: [
          {
            id: "6dd8c66d-2360-4f62-8a77-94b3735f0cf1",
            name: "Purity",
            age: 30,
            job: "International Brand Associate",
          },
        ],
      },
    },
  });

  await prisma.skill.createMany({
    data: [
      {
        id: "56b3442a-eb56-46a5-a1e9-953b7cfe489c",
        designation: "Verbal and presentation",
      },
      {
        id: "b514d396-ac67-4db7-92c7-2d56e665ddd6",
        designation: "Patience",
      },
      {
        id: "dc0b6133-e746-401c-bea2-e0f9233eb7cb",
        designation: "Dependability",
      },
      {
        id: "40cca01a-0377-4f49-93de-b5b9283bc4c9",
        designation: "Teamwork",
      },
      {
        id: "f7b31280-67ab-4aab-864b-a92f039a2bc3",
        designation: "Process automation",
      },
      {
        id: "c38e6e46-04b1-4fdc-8219-80a815339b40",
        designation: "Multilingualism",
      },
    ],
  });

  await prisma.cvSkill.createMany({
    data: [
      {
        cvId: "c013edea-23e6-4d21-97af-1f92fda6c23f",
        skillId: "56b3442a-eb56-46a5-a1e9-953b7cfe489c",
      },
      {
        cvId: "c013edea-23e6-4d21-97af-1f92fda6c23f",
        skillId: "b514d396-ac67-4db7-92c7-2d56e665ddd6",
      },
    ],
  });
}

main();
