// EditBlog.tsx
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Blog } from "../types/type";

function EditBlog() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setIsPending(true);
    fetch(`http://localhost:5000/api/getBlogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data: Blog) => {
        setTitle(data.title);
        setBody(data.body);
        setAuthor(data.author.name);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsPending(false);
      });
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedBlog = { title, body, author };
    setIsPending(true);
    fetch(`http://localhost:5000/api/updateBlog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    }).then(() => {
      setIsPending(false);
      navigate("/");
    });
  };

  return (
    <div className="create">
      <h2>Edit a blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Blog title: </label>
        <input
          id="title"
          className="border border-solid"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Blog body: </label>
        <textarea
          id="body"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label htmlFor="author">Blog author: </label>
        <input
          id="author"
          className="border border-solid rounded-8px"
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ width: `${author.length + 1}ch` }}
          disabled
        />
        <div className="flex justify-center mt-6">
          {!isPending && <button>Update Blog</button>}
          {isPending && <button disabled>Updating blog...</button>}
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
