import { Claims } from "@auth0/nextjs-auth0";


interface Auth0Claims extends Claims{
    sub?: string
}