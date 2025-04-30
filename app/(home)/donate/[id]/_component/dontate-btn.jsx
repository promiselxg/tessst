"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

const DonateBtn = ({ loading }) => {
  return (
    <>
      <Button
        type="submit"
        className="w-full bg-[--app-primary-color]"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className=" animate-spin w-4h-4" />
            generating payment link...
          </div>
        ) : (
          "Donate"
        )}
      </Button>
    </>
  );
};

export default DonateBtn;
