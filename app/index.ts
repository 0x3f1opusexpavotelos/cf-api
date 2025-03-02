import { Hono } from 'hono'
import { csrf } from 'hono/csrf';
import {postHandler} from './api/posts'


const app = new Hono()
app
  .use(csrf())
  .route('/posts', postHandler)
  .get('/', async(c) => {
    return c.redirect('/posts')
  })


export default app
