import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./app/_lib/prisma"


export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers:
        [
            GitHub({
                profile(profile) {

                    return {
                        id: profile.id.toString(),
                        name: profile.name,
                        email: profile.email,
                        image: profile.avatar_url
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