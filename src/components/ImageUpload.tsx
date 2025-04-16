"use client";

import { useState, useRef, useEffect } from "react";
import { api } from "~/trpc/react";
import Image from "next/image";
import { getMinioImageUrl } from "~/lib/utils";

interface ImageUploadProps {
  category: "profile" | "hackathon" | "general";
  onUploadComplete?: (key: string) => void;
  onUploadError?: (error: unknown) => void;
  hackathonId?: string;
  currentImageUrl?: string;
  className?: string;
  buttonText?: string;
  showPreview?: boolean;
}

export function ImageUpload({
  category,
  onUploadComplete,
  onUploadError,
  hackathonId,
  currentImageUrl,
  className = "",
  buttonText = "Upload Image",
  showPreview = true,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const uploadImage = api.asset.uploadImage.useMutation({
    onSuccess: (data) => {
      setUploadedKey(data.key);
      if (onUploadComplete) {
        onUploadComplete(data.key);
      }
      setIsUploading(false);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      if (onUploadError) {
        onUploadError(error);
      }
      setIsUploading(false);
    },
  });

  const { data: imageUrlData } = api.asset.getImageUrl.useQuery(
    { key: uploadedKey ?? "" },
    { 
      enabled: !!uploadedKey,
      retry: false
    }
  );

  useEffect(() => {
    if (imageUrlData?.url) {
      setPresignedUrl(imageUrlData.url);
    }
  }, [imageUrlData?.url]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload the file
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        await uploadImage.mutateAsync({
          category,
          fileName: file.name,
          fileType: file.type,
          fileBase64: base64 ?? "",
          hackathonId,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
      if (onUploadError) {
        onUploadError(error);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isUploading ? "Uploading..." : buttonText}
      </button>
      
      {showPreview && (
        <div className="mt-4">
          {previewUrl && (
            <div className="relative w-40 h-40">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          
          {uploadedKey && !previewUrl && presignedUrl && (
            <div className="relative w-40 h-40">
              <Image
                src={presignedUrl}
                alt="Uploaded"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          
          {uploadedKey && !previewUrl && !presignedUrl && (
            <div className="relative w-40 h-40 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          )}
          
          {currentImageUrl && !previewUrl && !uploadedKey && (
            <div className="relative w-40 h-40">
              <Image
                src={currentImageUrl}
                alt="Current"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 