"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createCategory } from "@/controllers/actions/category";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must be less than 50 characters"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryForm() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (data: CategoryFormData) => {
    console.log("Category created:", data);
    setLoading(true);
    // TODO: Add your API call here to save the category
    try {
      const result = await createCategory(data);
      if (result.success) {
        setLoading(false);
        reset();
        setOpen(false);
        toast.success(result.message);
      } else {
        setLoading(false);
        toast.success(result.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.success("Failed to Create");
    }
  };

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new product category. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g., Electronics, Clothing, Books"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || loading}>
              {isSubmitting || loading ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
