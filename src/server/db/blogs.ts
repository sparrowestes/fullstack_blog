import { Query } from './index';

const allBlogs = () => Query(`
    SELECT blogs.id, blogs.title, blogs.content, authors.name FROM blogs 
    JOIN authors 
    ON blogs.authorid = authors.id
    `);

const oneBlog = (id: number) => Query(`
    SELECT blogs.id, blogs.title, blogs.content, authors.name FROM blogs 
    JOIN authors 
    ON blogs.authorid = authors.id
    WHERE blogs.id = ?
    `, [id]);

const addBlog = (title: string, content: string, authorid: number) => Query(`
    INSERT INTO blogs (title, content, authorid)
    VALUES(?, ?, ?)
    `, [title, content, authorid]);

const updateBlog = (content: string, id: number) => Query(`
    UPDATE blogs
    SET content = ?
    WHERE blogs.id = ?;
    `, [content, id]);

const deleteBlog = (id: number) => Query(`
    DELETE FROM Blogs 
    WHERE id = ?
    `, 
    [id]);

export default {
    allBlogs,
    oneBlog,
    addBlog,
    updateBlog,
    deleteBlog
}