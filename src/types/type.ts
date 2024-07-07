export interface Author {
  id: number;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  author: Author;
  body: string;
}
