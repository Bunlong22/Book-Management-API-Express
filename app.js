const express = require("express");
const bodyParser = require("body-parser");
const books = [
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

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("home", {
    data: books,
  });
});

//
app.post("/", (req, res) => {
  const inputID = req.body.bookID;
  const inputBookName = req.body.bookName;
  const inputBookAuthor = req.body.bookAuthor;
  const inputBookPages = req.body.bookPages;
  const inputBookPrice = req.body.bookPrice;

  const newBook = {
    id: inputID,
    bookName: inputBookName,
    bookAuthor: inputBookAuthor,
    bookPages: inputBookPages,
    bookPrice: inputBookPrice,
  };

  books.push(newBook);

  res.redirect("/");
});

app.post("/newbooks", (req, res) => {
  var requestedBookName = req.body.bookName;
  books.forEach((book) => {
    if (book.bookName == requestedBookName) {
      book.bookState = "newbooks";
    }
  });
  res.render("home", {
    data: books,
  });
});

app.post("/update", (req, res) => {
  const inputID = parseInt(req.body.id);
  const inputBookName = req.body.bookName;
  const inputBookAuthor = req.body.bookAuthor;
  const inputBookPages = req.body.bookPages;
  const inputBookPrice = req.body.bookPrice;

  const bookToUpdate = books.find((book) => book.id === inputID);

  if (bookToUpdate) {
    bookToUpdate.bookName = inputBookName;
    bookToUpdate.bookAuthor = inputBookAuthor;
    bookToUpdate.bookPages = inputBookPages;
    bookToUpdate.bookPrice = inputBookPrice;

    res.send(
      `<script>alert("Book updated successfully!"); window.location.href = "/";</script>`
    );
  } else {
    res.send(
      `<script>alert("Book not found"); window.location.href = "/";</script>`
    );
  }
});

app.post("/search", (req, res) => {
  var requestedBookName = req.body.bookName;
  books.forEach((book) => {
    if (book.bookName == requestedBookName) {
      book.bookState = "Available";
    }
  });
  res.render("home", {
    data: books,
  });
});

app.post("/delete", (req, res) => {
  var requestedBookName = req.body.bookName;
  var j = 0;
  books.forEach((book) => {
    j = j + 1;
    if (book.bookName == requestedBookName) {
      books.splice(j - 1, 1);
    }
  });
  res.render("home", {
    data: books,
  });
});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});
