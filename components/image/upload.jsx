import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useFormData } from "@/context/form.context";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const FileUpload = ({ total, onChange, field }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { updateFormData } = useFormData();
  // Handle Image Change
  const handleImageChange = (e) => {
    if (!e?.target?.files) return;

    const filesArray = Array.from(e.target.files);
    const selectedFiles = [];
    const fileURLs = [];

    if (filesArray.length > total) {
      toast.error(`You can only upload up to ${total} files.`);
      e.target.value = "";
      return;
    }

    filesArray.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`The file "${file.name}" exceeds the 5MB limit.`);
      } else {
        selectedFiles.push(file);
        fileURLs.push(URL.createObjectURL(file));
      }
    });

    setSelectedImages((prevImages) => prevImages.concat(fileURLs));

    if (onChange) onChange(selectedFiles, field);
  };

  // Remove selected image
  const removeSelectedImage = (index, field) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    updateFormData({ [field]: updatedImages });
  };

  return (
    <div className="w-full flex mt-2">
      {selectedImages.length < 1 && (
        <div className="border border-dashed p-[30px] rounded-[8px] border-[rgba(0,0,0,0.1)] w-full cursor-pointer">
          <div className="flex flex-col cursor-pointer justify-center">
            <label
              htmlFor={`file-upload-${field}`}
              className="w-full cursor-pointer flex justify-center flex-col items-center"
            >
              <Image
                src="/oc-browse.svg"
                alt="image file upload"
                width={100}
                height={100}
                priority
              />
              <div className="my-2 flex flex-col justify-center items-center leading-tight text-center">
                <p className="text-sm text-[rgba(0,0,0,0.8)] shadow-md px-3 py-2 rounded-[8px] hover:shadow-sm transition-all hover:text-sky-400">
                  Browse an image
                </p>
              </div>
            </label>
          </div>
          <input
            type="file"
            id={`file-upload-${field}`}
            accept="image/png, image/gif, image/jpeg"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      )}

      {selectedImages.length > 0 && (
        <div className="flex flex-col w-full">
          <div className="w-full gap-3">
            {selectedImages.map((src, index) => (
              <div
                key={index}
                className="relative flex w-full justify-between items-center my-2 border border-dashed p-2 rounded-[8px] border-[rgba(0,0,0,0.1)]"
              >
                <div className="flex gap-3">
                  <Image
                    src={src}
                    width={200}
                    height={200}
                    alt="Selected"
                    className="w-14 h-14"
                  />
                </div>
                <Button
                  className=" bg-red-700 hover:bg-red-600 text-white px-[15px] -mt-6 text-[12px] h-[27px] rounded-[3px]"
                  onClick={() => removeSelectedImage(index, field)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
