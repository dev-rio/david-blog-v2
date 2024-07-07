import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  author: {
    name: string;
  };
}

interface BlogListProps {
  blogs: Blog[];
  title: string;
}

function BlogList(props: BlogListProps) {
  const { blogs, title } = props;

  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div
          className="py-2.5 px-4 my-5 mx-0 border-b border-custom-color-4 border-solid hover:shadow-custom-shadow ease-out duration-500"
          key={blog.id}
        >
          <Link to={`/blogs/${blog.id}`} className="no-underline">
            <h2 className="text-20px text-custom-color-2 mb-8px">
              {blog.title}
            </h2>
            <p>Written by {blog.author.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
