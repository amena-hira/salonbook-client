import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI);
const db = client.db("salonbook");

export const auth = betterAuth({
  //...

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "admin"],
        input: false,
        defaultValue: "customer",
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [admin()],
  database: mongodbAdapter(db, {
    client,
  }),
});
