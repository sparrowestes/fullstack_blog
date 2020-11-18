import { Query } from './';

const allBlogs = () => 
Query(`SELECT Blogs.*, Authors.name FROM Blogs JOIN Authors ON Blogs.authorid = Authors.id`);

const oneBlog = (id: number) => Query("SELECT blogs.id, blogs.title, blogs.content, authors.name FROM blogs JOIN authors ON blogs.authorid = authors.id WHERE blogs.id = ?;", [id]);

const addBlog = (title: string, content: string, authorid: number) => Query("INSERT INTO blogs (title, content, authorid) VALUES (?, ?, ?);", [title, content, authorid]);

const updateBlog = (title: string, content: string) => Query("UPDATE Blogs SET content = ? WHERE blogs.id = ?", [title, content]);

const deleteBlog = (id: number) => Query(`DELETE FROM Blogs WHERE id = ?`, [id]);

export default {
    allBlogs,
    oneBlog,
    addBlog,
    updateBlog,
    deleteBlog
}