import db from "@/lib/prisma";
import { Prisma } from "../app/generated/prisma/client";

const categoriesData: Prisma.CategoryCreateInput[] = [
  {
    title: "Electronics",
    slug: "electronics",
  },
  {
    title: "Fashion",
    slug: "fashion",
  },
];

export async function main() {
  for (const cat of categoriesData) {
    await db.category.create({ data: cat });
  }
}

main();
