import React, { useRef, useState } from "react";
import { PiImagesDuotone } from "react-icons/pi";
import { X } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";

interface Props {
  onChange?: (file: File | null) => void;
}

const UploadFileField = forwardRef(function UploadFileField(
  { onChange }: Props,
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setPreview(null);
      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  }));

  const handleOpen = () => {
    inputRef.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const url = URL.createObjectURL(selected);

    setPreview(url);
    setFile(selected);

    onChange?.(selected);
  };

  const handleRemove = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  };

  return (
    <div className="space-y-4">
      {/* preview */}
      {preview && (
        <div className="relative w-48 h-32 rounded-xl overflow-hidden border group">
          <img
            src={preview}
            className="w-full h-full object-cover"
            alt="preview"
          />

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* upload area */}
      {!preview && (
        <div
          onClick={handleOpen}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer group"
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition">
            <PiImagesDuotone className="text-primary" size={30} />
          </div>

          <p className="text-black font-medium text-center">
            Bấm để tải ảnh lên
          </p>

          <p className="text-xs text-slate-400 mt-1 text-center">
            JPG, PNG (tối đa 5MB)
          </p>
        </div>
      )}

      {/* hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
});

export default UploadFileField;
