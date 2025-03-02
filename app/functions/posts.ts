import { DrizzleD1Database } from "drizzle-orm/d1";
import {InsertPost, posts, SelectPost} from '~/app/db/schema'
import {eq} from "drizzle-orm"

export async function getPosts(
    db:DrizzleD1Database,
    authorId: string,
):Promise<SelectPost[]>{
    return await db.select().from(posts).where(eq(posts.authorId, authorId))
}


export async function insertPost(
    db: DrizzleD1Database,
    data: InsertPost
): Promise<SelectPost| null> {
    const result = await db.insert(posts).values(data).returning()

    if (Array.isArray(result) &&  result.length > 0) {
        return result[0]
    }
    return null
}
