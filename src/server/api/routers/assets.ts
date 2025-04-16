import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  uploadFileToMinio,
  deleteFileFromMinio,
  getPresignedUrl,
} from "~/server/storage/minio";

export const assetRouter = createTRPCRouter({
  uploadImage: protectedProcedure
    .input(
      z.object({
        category: z.enum(["profile", "hackathon", "general"]),
        fileName: z.string(),
        fileType: z.string(),
        fileBase64: z.string(),
        hackathonId: z.string().optional(),
      }).refine(
        (data) => data.category !== "hackathon" || !!data.hackathonId,
        { message: "hackathonId is required for hackathon images" }
      )
    )
    .mutation(async ({ ctx, input }) => {
      const { category, fileBase64, fileName, fileType, hackathonId } = input;
      const fileBuffer = Buffer.from(fileBase64, "base64");
      const id = category === "profile" ? ctx.session.user.id : hackathonId;
      const key = await uploadFileToMinio(
        category,
        fileBuffer,
        fileType,
        fileName,
        id
      );
      return { key };
    }),

  deleteImage: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input }) => {
      await deleteFileFromMinio(input.key);
      return { success: true };
    }),

  replaceImage: protectedProcedure
    .input(
      z.object({
        oldKey: z.string(),
        category: z.enum(["profile", "hackathon", "general"]),
        fileName: z.string(),
        fileType: z.string(),
        fileBase64: z.string(),
        hackathonId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { oldKey, category, fileBase64, fileName, fileType, hackathonId } =
        input;
      const fileBuffer = Buffer.from(fileBase64, "base64");
      const id = category === "profile" ? ctx.session.user.id : hackathonId;
      const newKey = await uploadFileToMinio(
        category,
        fileBuffer,
        fileType,
        fileName,
        id
      );
      try {
        await deleteFileFromMinio(oldKey);
      } catch (err) {
        console.warn("Failed to delete old image:", err);
      }
      return { newKey };
    }),

  getImageUrl: protectedProcedure
    .input(z.object({ key: z.string().min(1) }))
    .query(async ({ input }) => {
      try {
        const url = await getPresignedUrl(input.key);
        return { url };
      } catch (error) {
        console.error("Error getting presigned URL:", error);
        throw error;
      }
    }),
}); 