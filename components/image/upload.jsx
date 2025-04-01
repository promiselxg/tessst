import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const FileUpload = ({ total = 5, onChange }) => {
  const [files, setFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

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

    setFiles(selectedFiles);
    const fileArray = selectedFiles.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => prevImages.concat(fileArray));

    if (onChange) onChange(selectedFiles);

    fileURLs.forEach(URL.revokeObjectURL);
  };

  // Remove selected image
  const removeSelectedImage = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedImages = selectedImages.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setSelectedImages(updatedImages);

    if (onChange) onChange(updatedFiles);
  };

  return (
    <div className="w-full flex mt-2">
      {/* No images selected */}
      {selectedImages.length < 1 && (
        <div className="border border-dashed p-[30px] rounded-[8px] border-[rgba(0,0,0,0.1)] w-full cursor-pointer">
          <div className="flex flex-col cursor-pointer justify-center">
            <label
              htmlFor="files"
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
            name="files"
            id="files"
            accept="image/png, image/gif, image/jpeg"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      )}

      {/* Images selected */}
      {selectedImages.length > 0 && (
        <div className="flex flex-col w-full">
          <div className="w-full gap-3">
            {selectedImages.map((src, index) => (
              <div key={index} className="relative">
                <Image
                  src={src}
                  width={200}
                  height={200}
                  alt="Selected"
                  className="w-20 h-20 rounded-lg"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeSelectedImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
