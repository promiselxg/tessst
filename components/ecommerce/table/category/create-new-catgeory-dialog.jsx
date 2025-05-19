"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/lib/utils/api";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CreateNewCategory({ children, tab, fetchCategories }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCreateNewCategory = async () => {
    if (!value.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    const endpoint =
      tab === "store" ? "/category" : "/training/course/category";

    try {
      setLoading(true);
      const response = await apiCall("post", endpoint, { name: value.trim() });
      toast.success(response?.message || "Category created successfully");
      setValue("");
      setOpen(false);
      fetchCategories(tab);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Category</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Category name"
              name="name"
              id="name"
              disabled={loading}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            onClick={handleCreateNewCategory}
            disabled={loading || value.trim() === ""}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className=" animate-spin w-3 h-3" />{" "}
                <span>creating...</span>
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
