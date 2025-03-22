import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./app/_lib/prisma"


export const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers:
        [
            GitHub({
                async profile(profile) {

                    const user = await prisma.user.findFirst({
                        where: {
                            email: profile.email
                        }
                    });

                    const userRole = user?.role;

                    return {
                        id: profile.id.toString(),
                        name: profile.name,
                        email: profile.email,
                        image: profile.avatar_url,
                        role: userRole ?? "user"
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
    }

} satisfies NextAuthConfig;