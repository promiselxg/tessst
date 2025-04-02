"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("../animation/lottieAnimation"), {
  ssr: false,
});

const DeleteDialog = ({
  children,
  onConfirm,
  id,
  loading,
  label = "Are you sure you want to remove this product ?",
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-[90%] md:w-2/6 flex flex-col justify-center items-center">
          <LottieAnimation
            width="150px"
            height="150px"
            style={{ color: "red" }}
            animationData={require("../../public/animations/delete.json")}
          />
          <DialogHeader className="w-full flex items-center">
            <DialogTitle className="text-[15px] md:text-[30px] text-slate-700">
              Are you sure?
            </DialogTitle>
            <DialogDescription>{label}</DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3 w-full justify-center mb-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={onConfirm}
              className="bg-red-800 text-white hover:bg-red-600 transition-all text-sm"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className=" animate-spin" />
                  <span className="text-sm italic">please wait...</span>
                </div>
              ) : (
                "Yes, Delete it!"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
