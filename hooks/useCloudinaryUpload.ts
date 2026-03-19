import { Cloudinary } from "@/configs/appConfig";
import { useState } from "react";

interface UploadOptions {
  uploadPreset: string;
}

export const useCloudinaryUpload = ({ uploadPreset }: UploadOptions) => {
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImages = async (files: File[]) => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);
      setUploaded(0);
      setTotal(files.length);

      const urls: string[] = [];

      let completed = 0;

      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);

        const res = await fetch(
          `${Cloudinary.CLOUDINARY_UPLOAD_URL}/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error("Upload ảnh thất bại");
        }

        const result = await res.json();

        urls.push(result.secure_url);

        completed++;

        setUploaded(completed);

        const percent = Math.round((completed / files.length) * 100);
        setProgress(percent);
      }

      setUploading(false);

      return urls;
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setUploading(false);
      throw err;
    }
  };

  return {
    uploadImages,
    progress,
    uploaded,
    total,
    uploading,
    error,
  };
};
