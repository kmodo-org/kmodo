import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a URL for an image stored in Minio
 * @param key The object key from Minio
 * @returns The full URL to access the image
 */
export function getMinioImageUrl(key: string): string {
  if (!key) return "";
  
  // If the key is already a full URL, return it
  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }
  
  // Otherwise, construct the URL using the public Minio URL
  const baseUrl = process.env.NEXT_PUBLIC_MINIO_PUBLIC_URL || "http://localhost:9000";
  return `${baseUrl}/${process.env.MINIO_BUCKET || "assets"}/${key}`;
}
