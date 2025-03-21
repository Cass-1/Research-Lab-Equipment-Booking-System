import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role?: string; // Add your custom role field
    }

    interface Session {
        user: {
            role?: string; // Make role available in session
        } & DefaultSession["user"];
    }
}