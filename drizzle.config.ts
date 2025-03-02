import {config} from "dotenv"

import { defineConfig} from 'drizzle-kit'

config({path: ".env.local"})

export default defineConfig({
    dialect: "sqlite",
    schema: "app/db/schema.ts",
    out: "app/drizzle/migrations",
    driver: 'd1-http',
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_D1_TOKEN!,
    },
})
