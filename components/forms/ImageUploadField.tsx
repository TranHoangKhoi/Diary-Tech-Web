"use client";

import React, { useEffect, useRef, useState } from "react";
import { PiImagesDuotone } from "react-icons/pi";
import { X } from "lucide-react";
import { UseFormWatch } from "react-hook-form";

interface Props {
  field: any;
  register: any;
  setValue: any;
  watch: UseFormWatch<Record<string, unknown>>;
}

const ImageUploadField = ({ field, register, setValue, watch }: Props) => {
  const { ref, ...rest } = register(field._id);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const watchedFiles: any = watch(field._id);

  const handleOpen = () => {
    inputRef.current?.click();
  };

  const handleFiles = (filesList: FileList | null) => {
    if (!filesList) return;

    const newFiles = Array.from(filesList);

    const urls = newFiles.map((file) => URL.createObjectURL(file));

    const updatedFiles = [...(watchedFiles || []), ...newFiles];

    setFiles(updatedFiles);
    setPreviews((prev) => [...prev, ...urls]);

    setValue(field._id, updatedFiles);
  };

  const handleRemove = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);

    setPreviews(newPreviews);
    setFiles(newFiles);

    setValue(field._id, newFiles);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!watchedFiles || watchedFiles?.length === 0) {
      setFiles([]);
      setPreviews([]);
    }
  }, [watchedFiles]);

  return (
    <div className="space-y-4">
      {/* preview grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden border"
            >
              <img
                src={src}
                className="w-full h-32 object-cover"
                alt="preview"
              />

              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* upload area */}
      <div
        onClick={handleOpen}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-100 transition cursor-pointer group"
      >
        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition">
          <PiImagesDuotone className="text-primary" size={30} />
        </div>

        <p className="text-black font-medium text-center">
          Kéo thả ảnh vào đây hoặc bấm để tải lên
        </p>

        <p className="text-xs text-slate-400 mt-1 text-center">
          Hỗ trợ JPG, PNG (Tối đa 5MB)
        </p>
      </div>

      {/* hidden input */}
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = ""; // reset input
        }}
      />
    </div>
  );
};

export default ImageUploadField;
