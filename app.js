// const express = require("express");
// const bodyParser = require("body-parser");
// const books = [
//   {
//     id: 1,
//     bookName: "A",
//     bookAuthor: "Mr. A",
//     bookPrice: 240,
//   },
//   {
//     id: 2,
//     bookName: "B",
//     bookAuthor: "Mr. B",
//     bookPrice: 240,
//   },
// ];

// const app = express();

// app.set("view engine", "ejs");

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// app.get("/", function (req, res) {
//   res.render("home", {
//     data: books,
//   });
// });

// app.post("/", (req, res) => {
//   const inputID = req.body.bookID;
//   const inputBookName = req.body.bookName;
//   const inputBookAuthor = req.body.bookAuthor;
//   const inputBookPages = req.body.bookPages;
//   const inputBookPrice = req.body.bookPrice;

//   const newBook = {
//     id: inputID,
//     bookName: inputBookName,
//     bookAuthor: inputBookAuthor,
//     bookPages: inputBookPages,
//     bookPrice: inputBookPrice,
//   };

//   books.push(newBook);

//   res.redirect("/");
// });

// app.post("/newbooks", (req, res) => {
//   var requestedBookName = req.body.bookName;
//   books.forEach((book) => {
//     if (book.bookName == requestedBookName) {
//       book.bookState = "newbooks";
//     }
//   });
//   res.render("home", {
//     data: books,
//   });
// });

// app.post("/update", (req, res) => {
//   const inputID = parseInt(req.body.id);
//   const inputBookName = req.body.bookName;
//   const inputBookAuthor = req.body.bookAuthor;
//   const inputBookPages = req.body.bookPages;
//   const inputBookPrice = req.body.bookPrice;

//   const bookToUpdate = books.find((book) => book.id === inputID);

//   if (bookToUpdate) {
//     bookToUpdate.bookName = inputBookName;
//     bookToUpdate.bookAuthor = inputBookAuthor;
//     bookToUpdate.bookPages = inputBookPages;
//     bookToUpdate.bookPrice = inputBookPrice;

//     res.send(
//       `<script>alert("Book updated successfully!"); window.location.href = "/";</script>`
//     );
//   } else {
//     res.send(
//       `<script>alert("Book not found"); window.location.href = "/";</script>`
//     );
//   }
// });

// app.post("/search", (req, res) => {
//   var requestedBookName = req.body.bookName;
//   books.forEach((book) => {
//     if (book.bookName == requestedBookName) {
//       book.bookState = "Available";
//     }
//   });
//   res.render("home", {
//     data: books,
//   });
// });

// app.post("/delete", (req, res) => {
//   var requestedBookName = req.body.bookName;
//   var j = 0;
//   books.forEach((book) => {
//     j = j + 1;
//     if (book.bookName == requestedBookName) {
//       books.splice(j - 1, 1);
//     }
//   });
//   res.render("home", {
//     data: books,
//   });
// });

// app.listen(3000, (req, res) => {
//   console.log("App is running on port 3000");
// });
const express = require("express");
const app = express();

let books = [
  {
    id: 1,
    bookName: "A",
    bookAuthor: "Mr. A",
    bookPrice: 240,
  },
  {
    id: 2,
    bookName: "B",
    bookAuthor: "Mr. B",
    bookPrice: 240,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  // res.status(200).json(books);
  res.send("Hello and Welcome to Book Management");
});
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((item) => item.id === bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  const index = books.findIndex((item) => item.id === bookId);

  if (index !== -1) {
    books[index] = { ...books[index], ...updatedBook };
    res.status(200).json(books[index]);
  } else {
    res.status(404).send("Book not found");
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const index = books.findIndex((item) => item.id === bookId);

  if (index !== -1) {
    const deletedBook = books[index];
    books.splice(index, 1);
    res.status(200).json(deletedBook);
  } else {
    res.status(404).send("Book not found");
  }
});

const port = 3002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
