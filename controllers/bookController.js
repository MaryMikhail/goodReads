var Book = require("../models/book");
const ErrObject = require("../ErrorData");
const { ValidationError } = require("mongoose").Error;

//!
//! IMPORTANT Convert all promises to await =)
//!

// get all books
const allBooks = (req, res) => {
  Book.find().then((books) => res.send(books));
};

// get book by id
const getBook = (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then((book) => {
      if (book == undefined)
        return next(ErrObject.notFoundError("Book Not Found"));
      res.send(book);
    })
    .catch((err) => {
      next(err);
    });
};









// add new book
const postBook = (req, res, next) => {
  let book = new Book({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    price: req.body.price,
    pagesCount: req.body.pagesCount,
    reviewCount: req.body.reviewCount,
    author: req.body.author,
  });

  book
    .save()
    .then(() => res.send(book))
    .catch((err) => next(ErrObject.notAcceptableError(err.message)));
};

// put book by id
const putBook = async (req, res, next) => {
  if (req.params.id != req.body.id && req.body.id != undefined)
    return next(ErrObject.badRequestError());

  Book.findOne({ id: req.params.id })
    .then((book) => {
      if (book == undefined)
        return next(ErrObject.notFoundError("Book Not found"));
    })
    .catch((err) => {
      return next(ErrObject.internalServerError());
    });

  var book = await Book.findOne({ id: req.params.id }).exec();

  //TODO Use Options Pattern..Object.Assign??
  Book.updateOne(
    { id: req.params.id },
    {
      title: req.body.title || book.title,
      description: req.body.description || book.description,
      rating: req.body.rating || book.rating,
      price: req.body.price || book.price,
      pagesCount: req.body.pagesCount || book.pagesCount,
      reviewCount: req.body.reviewCount || book.reviewCount,
      author: req.body.author || book.author,
    }
  )
    .then(() => res.send(`Book With ID ${req.params.id} Updated Successfully`))
    .catch((err) => {
      if (err instanceof ValidationError)
        return next(ErrObject.notAcceptableError(err.message));
      return next(ErrObject.internalServerError());
    });
};

// TODO not fully tested.
// delete book by id
const deleteBook = (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then((book) => {
      if (book == undefined)
        return next(ErrObject.notFoundError("Book Not found"));
    })
    .catch((err) => {
      return next(ErrObject.internalServerError());
    });

  Book.deleteOne({ id: req.params.id })
    .then(() => {
      return res.send(`Book with ID ${req.params.id} Deleted Successfully `);
    })
    .catch((err) => ErrObject.internalServerError());
};

module.exports = {
  allBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
};
