"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "~/components/ImageUpload";
import { getMinioImageUrl } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function TestMinioPage() {
  const [imageKey, setImageKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  // Only enable the query when we have a valid image key
  const { data: imageUrlData, refetch: getImageUrl, isError } = api.asset.getImageUrl.useQuery(
    { key: imageKey ?? "" },
    { 
      enabled: false, // Disable automatic query execution
      retry: false
    }
  );

  useEffect(() => {
    if (imageUrlData?.url) {
      setImageUrl(imageUrlData.url);
      setError(null);
    }
  }, [imageUrlData?.url]);

  useEffect(() => {
    if (isError) {
      setError("Failed to get image URL. Please try again.");
    }
  }, [isError]);

  const handleUploadComplete = (key: string) => {
    console.log("Upload complete, image key:", key);
    if (key && key.length > 0) {
      setImageKey(key);
      setError(null);
      
      // Get a presigned URL for the image
      void getImageUrl();
    } else {
      setError("Invalid image key received");
    }
  };

  const handleUploadError = (error: unknown) => {
    setError("Failed to upload image. Please try again.");
    console.error("Upload error:", error);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Minio Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upload Test Image</h2>
          
          <ImageUpload
            category="general"
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            currentImageUrl={imageKey ? getMinioImageUrl(imageKey) : undefined}
            buttonText="Upload Test Image"
            className="mb-4"
          />
          
          {error && (
            <div className="text-red-500 mt-2">
              {error}
            </div>
          )}
          
          {imageKey && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Image key: {imageKey}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Public URL: {getMinioImageUrl(imageKey)}
              </p>
              {imageUrl && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Presigned URL: {imageUrl}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
          
          {imageKey && imageUrl && (
            <div className="relative w-full h-64">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="object-contain w-full h-full"
              />
            </div>
          )}
          
          {imageKey && !imageUrl && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Loading image...
            </div>
          )}
          
          {!imageKey && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Upload an image to see the preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 