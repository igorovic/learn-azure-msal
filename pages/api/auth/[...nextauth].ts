import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
/* import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "lib/mongodb"; */
import type { NextApiRequest, NextApiResponse } from "next";

const tenantId = String(process.env.AZURE_TENANT_ID);
const clientId = String(process.env.AZURE_CLIENT_ID);
const clientSecret = String(process.env.AZURE_CLIENT_SECRET);
const primaryUserFlow = String(process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW);
const secret = String(process.env.SECRET);

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    /* adapter: MongoDBAdapter({
      db: (await clientPromise).db(String(process.env.DBNAME)),
    }), */
    secret: String(process.env.SECRET),
    debug: true,
    // Configure one or more authentication providers
    providers: [
      AzureADB2CProvider({
        tenantId,
        clientId,
        clientSecret,
        primaryUserFlow,
        profile: (profile, token) => {
          console.debug(profile);
          console.debug(token);
          return profile;
        },
        authorization: {
          params: {
            scope: `offline_access openid`,
          },
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, account }) {
        console.debug("account", account);
        console.debug("token", token);

        return token;
      },
    },
    session: {
      jwt: true,
      maxAge: 600,
    },
    jwt: {
      secret,
      //* interesting: process.env.SIGNING_KEY is not defined if not on this line
      signingKey: String(process.env.SIGNING_KEY),
    },
  });
}
