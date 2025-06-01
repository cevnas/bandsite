import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  videos: defineTable({
    title: v.string(),
    description: v.string(),
    storageId: v.id("_storage"),
  }),
});