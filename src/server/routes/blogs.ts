import * as express from 'express';
import db from '../db';

const router: express.Router = express.Router();

// SHOW ALL BLOGS
router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        console.log("test")
        let blogs = await db.Blogs.allBlogs();
        console.log(blogs)
        res.send(blogs);
    } catch(err) {
        console.error(err);
    }
});

// SHOW ONE BLOG
router.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id: number = Number(req.params.id);
        const blog = await db.Blogs.oneBlog(id);
        const blogtags = await db.Blogtags.one(id);
        blog[0].tags = blogtags[0]
        res.json(blog[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// POST NEW BLOG AS WELL AS CREATE A NEW AUTHOR
router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const author: { name: string, email: string } = req.body.author,
            blog: { title: string, content: string, tags: [] } = req.body.blog,
            blogtags: string[] = req.body.blog.tags;

        const newAuthor = await db.Authors.insert(author.name, author.email),
            newBlog = await db.Blogs.addBlog(blog.title, blog.content, newAuthor.insertId);
            await db.Blogtags.insert(newBlog.insertId, blogtags);

        res.status(200).send(`
            author created with id: ${newAuthor.insertId}
            blog created with id: ${newBlog.insertId}
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// EDIT BLOG - CONTENT ONLY
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const content: string = req.body.content,
            id = Number(req.params.id);
        await db.Blogs.updateBlog(content, id);
        res.status(200).send(`blog edited at id: ${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// DELETE A BLOG
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const id: number = Number(req.params.id);

        await db.Blogtags.deleteBlogTags(id);
        await db.Blogs.deleteBlog(id);
        
        res.send(`blog ${id} was deleted`);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router