import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Blog, Author } from "../types/type";

function Create() {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(function () {
    fetch("http://localhost:5000/api/getAuthors")
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then(function (data: Author[]) {
        setAuthors(data);
        setAuthor(data.length > 0 ? data[0].name : "");
      })
      .catch(function (err) {
        console.error(err.message);
      });
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const blog: Blog = { title, body, author };
    setIsPending(true);
    fetch("http://localhost:5000/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(function () {
      console.log("new blog added");
      setIsPending(false);
      navigate("/");
    });
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Blog title: </label>
        <input
          className="border border-solid"
          type="text"
          required
          value={title}
          onChange={function (e) {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="">Blog body: </label>
        <textarea
          required
          value={body}
          onChange={function (e) {
            setBody(e.target.value);
          }}
        ></textarea>
        <label htmlFor="">Blog author: </label>
        <select
          value={author}
          onChange={function (e) {
            setAuthor(e.target.value);
          }}
        >
          {authors.map(function (auth) {
            return (
              <option key={auth.id} value={auth.name}>
                {auth.name}
              </option>
            );
          })}
        </select>
        <div className="flex justify-center mt-6">
          {!isPending && <button>Add Blog</button>}
          {isPending && <button disabled>Adding blog ...</button>}
        </div>
      </form>
    </div>
  );
}

export default Create;
