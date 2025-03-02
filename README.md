publish severless api like a breeze

感谢[cloudflare 大善人](https://developers.cloudflare.com/workers/)

## Introducing the Bun runtime
```bash
# file runner
bun app/index.ts
# script runner
#  "db:generate": "drizzle-kit generate --config drizzle.config.ts",
bun db:generate
#  equivalent package executable runner
bunx drizzle-kit generate --config drizzle.config.ts
```


###  hono
- Fully typed
- Works in any runtime - Node.js, Bun, Deno, Cloudflare Workers

```bash
bun create hono@latest cf-api
```


###  dirzzle-orm

```bash
bun add drizzle-orm @libsql/client
bun add -D drizzle-kit  dotenv
```


### wrangler

```bash
# create d1 database
bunx wrangler d1 create cfd1
bunx drizzle-kit generate
# accountid databaseid apitoken
# bunx drizzle-kit migrate



# apply migration to local d1 database
# --remote or --local
# --command or --file
bunx wrangler d1 execute cfd1 --remote --file=app/drizzle/migrations/0000_spooky_malcolm_colcord.sql


bunx wrangler d1 execute cfd1 --local --file=app/drizzle/migrations/0000_spooky_malcolm_colcord.sql
# local db is in .wrangler/state/v3/d1/miniflare-D1DatabaseObject/ac41ad467e6e04d3ebc186b89a50bb752df53230e356821590edaae124ab340d.sqlite
# apply migration to local remote database

```



## For CI

```bash
# merge with new github repo
git merge --allow-unrelated-histories <remote-name>/<branch-name>
git pull origin main --allow-unrelated-histories
git push --set-upstream origin main
```

then go to your GitHub repository settings dashboard: `Settings->Secrets and variables->Actions->Repository secrets`, and add a new secret with the name `CLOUDFLARE_API_TOKEN`

then create `.github/workflows/deploy.yml` in  project root folder




## Self-Hosting Auth


Generates an email action link.
