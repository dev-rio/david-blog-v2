import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const generateRandomId = (length: number): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

app.post("/api/author", async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).send("Name is required");
    }

    const existingAuthor = await prisma.author.findFirst({
      where: { name: name },
    });

    if (existingAuthor) {
      return res.status(400).send("Author already exists");
    }

    const newAuthor = await prisma.author.create({
      data: { name: name },
    });

    console.log(newAuthor);
    res.json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/getAuthors", async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/getBlogs", async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({ include: { author: true } });
    console.log(blogs);
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/updateBlog/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: id },
      data: {
        title: title,
        body: body,
      },
    });
    console.log("Success Update:", updatedBlog);
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/getBlogs/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await prisma.blog.findUnique({
      where: { id: id },
      include: {
        author: true,
      },
    });

    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    console.log(blog);
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/getBlogs/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const blog = await prisma.blog.delete({
      where: { id: id },
    });
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/blog", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { title, body, author: authorName } = req.body;
    console.log(title, body, authorName);
    if (!title || !body || !authorName) {
      return res.status(400).send("Title, body and author name are required");
    }

    const author = await prisma.author.findFirst({
      where: { name: authorName },
    });

    if (!author) {
      return res.status(400).send("Author not found");
    }

    const newBlog = await prisma.blog.create({
      data: {
        id: generateRandomId(4),
        title: title,
        body: body,
        author: {
          connect: { id: author.id },
        },
      },
    });

    console.log(newBlog);
    res.json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
