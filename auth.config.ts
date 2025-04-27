import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./app/_lib/prisma"


export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers:
        [
            GitHub({
                // runs once and creates a user in the database
                async profile(profile) {
                    return {
                        id: profile.id.toString(),
                        name: profile.name,
                        email: profile.email,
                        image: profile.avatar_url,
                    }
                }
            }),
            Google({
                clientId: process.env.AUTH_GOOGLE_ID,
                clientSecret: process.env.AUTH_GOOGLE_SECRET,
            })
        ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.SECRET,
} satisfies NextAuthConfig;