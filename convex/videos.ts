import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createVideo = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    fileId: v.id("_storage"), // This will be the storageId returned by Convex after upload
  },
  handler: async (ctx, args) => {
    const videoId = await ctx.db.insert("videos", {
      title: args.title,
      description: args.description,
      storageId: args.fileId,
    });
    return videoId;
  },
});

export const getVideos = query({
  handler: async (ctx) => {
    return await ctx.db.query("videos").collect();
  },
});

// Add a mutation to generate an upload URL
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Add a query to get the URL for a stored video
export const getVideoUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});