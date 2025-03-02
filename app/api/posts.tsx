import { Hono } from 'hono';
import { Bindings } from '../bindings';
import { drizzle } from 'drizzle-orm/d1'
import {posts} from '~/app/db/schema'



export const postHandler = new Hono<{Bindings: Bindings}>()

postHandler
    .get('/', async (c) => {
    const db = drizzle(c.env.CFDB)
    const result =  await db.select().from(posts).all()
    return c.json(result)
    })
    .post('/', async(c) => {
      const db = drizzle(c.env.CFDB)
      const {title,content, authorId} = await c.req.json()
      const result = await db
        .insert(posts)
        .values({title, content, authorId})
        .returning()
      return c.json(result)
    })
    .get(":slug/comments", async(c) => {
        // Query Data
        const {slug} = c.req.param()
        const  {results} = await c.env.CFDB.prepare(`
            select * from comments where post_slug = ?
        `)
        .bind(slug)
        .all()
        return c.json(results)
    })
    .post(":slug/comments", async (c) => {
        // Insert Data
        const {slug} = c.req.param()
        const {authorId, body} = await c.req.json()

        const {success} = await c.env.CFDB.prepare(
            `
                Insert into comments (authorId, body, post_slug) values (?, ?, ?)
            `
        )
        .bind(authorId,body,slug)
        .run()

        if(success) {
            c.status(201)
            return c.text("success")
        } else {
            c.status(500)
            return c.text("Internal Server Error")
        }
     })

