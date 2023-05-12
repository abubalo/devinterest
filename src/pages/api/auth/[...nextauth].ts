import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import config from "../config/config"


export const authOptions ={

        providers: [
            GithubProvider({
                clientId: config.url.GITHUB_ID,
                clientSecret: config.url.GITHUB_SECRET,
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
            }),
        ],

        secret: process.env.JWT_SECRET
    
}

export default NextAuth(authOptions);