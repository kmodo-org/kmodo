import { Client } from "minio";
import { env } from "~/env";

// Initialize Minio client
export const minioClient = new Client({
  endPoint: env.MINIO_ENDPOINT,
  port: Number(env.MINIO_PORT),
  useSSL: env.MINIO_USE_SSL === "true",
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
});

// Bucket name from environment or default
export const bucketName = env.MINIO_BUCKET || "assets";

// Prefixes for different types of assets
const PREFIX = {
  profile: "pfps/",
  hackathon: "hackathons/",
  general: "general/",
} as const;

/**
 * Upload a file to Minio
 * @param category The category of the file (profile, hackathon, general)
 * @param fileBuffer The file buffer
 * @param fileMime The MIME type of the file
 * @param fileName The original file name
 * @param userOrId Optional user ID or identifier
 * @returns The object key of the uploaded file
 */
export async function uploadFileToMinio(
  category: keyof typeof PREFIX,
  fileBuffer: Buffer,
  fileMime: string,
  fileName: string,
  userOrId?: string
): Promise<string> {
  // Ensure bucket exists
  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName);
  }

  // Generate object key based on category and parameters
  let objectKey = PREFIX[category];

  const ext = fileName.substring(fileName.lastIndexOf("."));
  if (category === "profile") {
    objectKey += `${userOrId}${ext}`;
  } else if (category === "hackathon") {
    objectKey += `${userOrId}-${Date.now()}${ext}`;
  } else {
    objectKey += `${Date.now()}-${fileName}`;
  }

  // Upload the file
  await minioClient.putObject(
    bucketName,
    objectKey,
    fileBuffer,
    fileBuffer.length,
    {
      "Content-Type": fileMime,
    }
  );

  return objectKey;
}

/**
 * Delete a file from Minio
 * @param objectKey The object key of the file to delete
 */
export async function deleteFileFromMinio(objectKey: string): Promise<void> {
  await minioClient.removeObject(bucketName, objectKey);
}

/**
 * Get a presigned URL for a file
 * @param objectKey The object key of the file
 * @param expirySeconds The number of seconds until the URL expires
 * @returns The presigned URL
 */
export async function getPresignedUrl(
  objectKey: string,
  expirySeconds = 60 * 60 * 24 // 24 hours
): Promise<string> {
  return await minioClient.presignedGetObject(bucketName, objectKey, expirySeconds);
} 