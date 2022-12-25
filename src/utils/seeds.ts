import { createPrisma } from "@/app";

export const deleteUserByEmail = async (email: string) => {
  const prisma = createPrisma();
  const userToBeDeleted = await prisma.user.findFirst({
    where: { email },
  });

  if (userToBeDeleted) {
		await prisma.token.deleteMany({
			where: { userId: userToBeDeleted.id }
		});

    await prisma.user.delete({
      where: { id: userToBeDeleted.id },
    });
  }
};
