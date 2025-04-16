"use client";

import { useState } from "react";
import { ImageUpload } from "~/components/ImageUpload";
import { getMinioImageUrl } from "~/lib/utils";

export default function ProfilePage() {
  const [profileImageKey, setProfileImageKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (key: string) => {
    setProfileImageKey(key);
    setError(null);
    console.log("Upload complete, image key:", key);
  };

  const handleUploadError = (error: unknown) => {
    setError("Failed to upload image. Please try again.");
    console.error("Upload error:", error);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
        
        <ImageUpload
          category="profile"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          currentImageUrl={profileImageKey ? getMinioImageUrl(profileImageKey) : undefined}
          buttonText="Change Profile Picture"
          className="mb-4"
        />
        
        {error && (
          <div className="text-red-500 mt-2">
            {error}
          </div>
        )}
        
        {profileImageKey && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Image key: {profileImageKey}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Full URL: {getMinioImageUrl(profileImageKey)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 