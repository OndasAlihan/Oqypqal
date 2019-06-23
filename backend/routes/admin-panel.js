const express = require('express');
const router = express.Router();
const dbDebug = require('debug')('app:db');

mongoose.connect("mongodb://localhost/oqypqal")
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error', err));

const Book = mongoose.model('Book', bookSchema);
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    releaseDate: Date,
    genre: String
});

async function getListOfBooks() {
    return Book.find();
}

async function createBook(data) {
    let book = new Book({
        name: data.name,
        author: data.author,
        price: data.price,
        releaseDate: data.releaseDate,
        genre: data.genre
    });

    const res = await book.save();
    return res;
}

router.get("/", (req, res) => {
    res.send(getListOfBooks());
    dbDebug('The full list of books has been sent to client');
});

// here req should contain JSON object that contains correct data to create book
// Should add here data validation with Joi
router.get("/create-book", (req, res) => {
    const result = createBook(req);
    dbDebug(result);
    res.send(result);
});

router.get('/delete-book', (req, res) => {


});




