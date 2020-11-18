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
        const data = await db.Blogs.oneBlog(id);
        res.send(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// POST NEW BLOG
router.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const blog = req.body;
        const newBlog = await db.Blogs.addBlog (blog.title, blog.content, blog.authorid);
        res.json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// EDIT BLOG BODY
router.put("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id: any = Number(req.params.id);
        const newBlogContent = req.body.content;
        await db.Blogs.updateBlog(newBlogContent, id);
    
        res.status(200).send(`Updated blog ${id}`)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// DELETE A BLOG
router.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id: number = Number(req.params.id);
        await db.Blogs.deleteBlog(id);

        res.send(`blog ${id} was deleted`);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

export default router