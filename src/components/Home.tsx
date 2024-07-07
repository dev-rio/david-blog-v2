import BlogList from "./BlogList";
import useFetch from "../hooks/useFetch";
import { Blog } from "../types/type";

function Home() {
  const { isPending, error, data } = useFetch(
    "http://localhost:5000/api/getBlogs"
  );
  const blogs = data as Blog[] | null;

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs!" />}
    </div>
  );
}

export default Home;
