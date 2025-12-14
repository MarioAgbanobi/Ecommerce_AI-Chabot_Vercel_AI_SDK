"use server";
import { CategoryFormData } from "@/components/category-form";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(data: CategoryFormData) {
  try {
    const slug = data.name.toLowerCase().trim().split(" ").join("-");
    const newCategory = {
      title: data.name,
      slug,
    };
    const cat = await db.category.create({
      data: newCategory,
    });
    console.log(cat);
    revalidatePath("/");
    return {
      success: true,
      message: "Category Created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to Create Category",
    };
  }
}
