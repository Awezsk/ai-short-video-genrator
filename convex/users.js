import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        pictureURL: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if user already exists
        const existingUser = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect();

        // If user exists, return the existing user
        if (existingUser.length > 0) {
            return existingUser[0];
        }

        // If not, insert new user
        const userData = {
            name: args.name,
            email: args.email,
            pictureURL: args.pictureURL,
            credits: 10
        };
        
        const userId = await ctx.db.insert('users', userData);
        
        // Fetch and return the complete user document with _id
        const newUser = await ctx.db.get(userId);
        return newUser;
    }
})