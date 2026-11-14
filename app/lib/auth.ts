import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/hireloop";
const client = new MongoClient(uri);
const db = client.db();

const googleClientId =
  process.env.GOOGLE_CLIENT_ID ||
  process.env.GOOGLE_ID ||
  process.env.GOOGLE_CLIENT_ID_KEY ||
  "";
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET ||
  process.env.GOOGLE_CLIENT_SECRECT ||
  process.env.GOOGLE_SECRET ||
  process.env.GOOGLE_SECRECT ||
  process.env.GOOGLE_SECRET_ID ||
  process.env.GOOGLE_KEY ||
  "";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret: process.env.BETTER_AUTH_SECRET || "hireloop-fallback-production-secret-2026",
  baseURL,
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://hireloop-livid.vercel.app",
    "https://*.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "seeker",
      },
    },
  },
});
