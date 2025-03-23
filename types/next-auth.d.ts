import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role?: Role; // Add your custom role field
    }

    interface Session {
        user: {
            role?: Role; // Make role available in session
        } & DefaultSession["user"];
    }
}