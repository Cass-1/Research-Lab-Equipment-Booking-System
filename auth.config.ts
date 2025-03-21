import { PrismaClient } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"


const prisma = new PrismaClient()

export const authConfig = {
    adapter: PrismaAdapter(prisma), // this line crashes shit
    providers:
        [
            GitHub({
                async profile(profile) {
                    return {
                        // Convert GitHub's numeric ID to string
                        id: profile.id.toString(),
                        // Map required fields
                        email: profile.email,
                        name: profile.name || profile.login,
                        image: profile.avatar_url,
                        // Add custom role field
                        // role: existingUser?.role ?? "user"
                    }
                }
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
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
            }
            return session;
        }
    }

} satisfies NextAuthConfig;