import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Blog } from "../types/type";

function BlogDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isPending, error } = useFetch(
    `http://localhost:5000/api/getBlogs/${id}`
  );
  const blog = data as Blog | null;
  const navigate = useNavigate();

  function handleClick() {
    if (blog) {
      fetch(`http://localhost:5000/api/getBlogs/${blog.id}`, {
        method: "DELETE",
      }).then(function () {
        navigate("/");
      });
    }
  }

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <div className="flex justify-between items-center mt-2.5">
            <h2>{blog.title}</h2>
            <div>
              <button className="text-white bg-custom-color-2 rounded-8px p-1 mr-2 text-lg hover:text-black transform ease-out duration-100">
                <Link to={`/edit/${id}`}>Edit</Link>
              </button>
              <button
                className="text-white bg-custom-color-2 rounded-8px p-1 text-lg hover:text-black transform ease-out duration-100"
                onClick={handleClick}
              >
                Delete
              </button>
            </div>
          </div>
          <p>Written by {blog.author.name}</p>
          <div>{blog.body}</div>
        </article>
      )}
    </div>
  );
}

export default BlogDetails;
