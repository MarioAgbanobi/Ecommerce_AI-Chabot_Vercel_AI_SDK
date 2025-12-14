import db from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}
