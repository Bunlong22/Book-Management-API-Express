const http = require("http");
const url = require("url");

let books = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); //
  const path = parsedUrl.pathname; //
  const method = req.method; //

  if (path === "/books") {
    if (method === "GET") {
      // Get all books
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(books));
    } else if (method === "POST") {
      // Create a new book
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const newBook = JSON.parse(body);
        books.push(newBook);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(newBook));
      });
    }
  } else if (path.startsWith("/books/")) {
    const bookId = path.split("/")[2];

    if (method === "GET") {
      // Get a specific book by ID
      const book = books.find((item) => item.id === bookId);

      if (book) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(book));
      } else {
        res.statusCode = 404;
        res.end("Book not found");
      }
    } else if (method === "PUT") {
      // Update a book by ID
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const updatedBook = JSON.parse(body);
        const index = books.findIndex((item) => item.id === bookId);

        if (index !== -1) {
          books[index] = { ...books[index], ...updatedBook };
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(books[index]));
        } else {
          res.statusCode = 404;
          res.end("Book not found");
        }
      });
    } else if (method === "DELETE") {
      // Delete a book by ID
      const index = books.findIndex((item) => item.id === bookId);

      if (index !== -1) {
        const deletedBook = books[index];
        books.splice(index, 1);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(deletedBook));
      } else {
        res.statusCode = 404;
        res.end("Book not found");
      }
    }
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

const port = 3002;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
