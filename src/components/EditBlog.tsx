import * as React from "react";
import { blog } from "../client/types";
import { RouteComponentProps } from "react-router-dom";

const EditBlog: React.FC<EditBlogProps> = (props: EditBlogProps) => {
  const [blog, setBlog] = React.useState<blog>({
    id: null,
    title: "",
    content: "",
    name: "",
  });

  React.useEffect(() => {
    (async () => {
      let data = await fetch(`/api/blogs/${props.match.params.id}`);
      let blog = await data.json();
      setBlog(blog);
    })();
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setBlog({
      id: blog.id,
      title: blog.title,
      content: e.target.value,
      name: blog.name,
    });

  const saveEdit = async (id: number, content: string) => {
    await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    });
    props.history.push(`/blog/${id}`);
  };

  const deleteBlog = async (id: number) => {
    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });
    props.history.push(`/`);
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="shadow card home-blog-card m-3">
          <div className="card-body">
            <div className="row mx-2">
              <h3 className="card-title">{blog.title}</h3>
            </div>
            <div className="row mx-2">
              <h6 className="card-subtitle mb-2 text-muted">{blog.name}</h6>
            </div>
            {blog.tags?.map((tag: { name: string }) => (
              <span className="badge badge-pill badge-secondary m-1">
                {tag.name}
              </span>
            ))}
            <div className="row mx-2 my-2">
              <textarea
                className="card-text"
                defaultValue={blog.content}
                onChange={(e) => handleContentChange(e)}
                rows={24}
                cols={80}
              ></textarea>
            </div>
            <button
              className="btn btn-sm btn-dark m-2"
              onClick={() => saveEdit(blog.id, blog.content)}
            >
              Save Edit{" "}
            </button>
            <button
              className="btn btn-sm btn-dark m-2"
              onClick={() => deleteBlog(blog.id)}
            >
              Delete Blog{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EditBlogProps extends RouteComponentProps<{ id: string }> {}

export default EditBlog;
