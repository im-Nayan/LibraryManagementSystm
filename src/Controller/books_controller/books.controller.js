const bookModel = require('../../model/Books_model/books.model');

class bookController {
    async bookstable(req, res) {
        if (req.cookieData) {
            let books = await bookModel.find();
            if (books) {
                res.render('book/bookTable', { books })
            } else {

                // res.send('hellow')
                res.render('book/bookTable', { books: 0 })
            }

        } else {

        }
    }
    async books_add(req, res) {
        if (req.cookieData) {

            // res.send('hellow')
            res.render('book/bookAdd')
        } else {
            res.redirect('/admin')
        }
    }
    async book_edit(req, res) {
        if (req.cookieData) {
            const ID = req.params.id
            // console.log(ID);
            let bookDetails = await bookModel.findById({ _id: ID })
            // res.send('hellow')
            if (bookDetails) {

                res.render('book/bookEdit', { bookDetails });
            } else {
                res.redirect('/admin/bookstable');

            }
        } else {
            res.redirect('/admin')
        }
    }
    async book_delete(req, res) {
        if (req.cookieData) {
            const ID = req.params.id
            // console.log(ID);
            let bookDetails = await bookModel.findByIdAndUpdate({ _id: ID }, { isDeleted: true })
            // res.send('hellow')
            if (bookDetails) {
                res.redirect('/admin/bookstable');
            }
        } else {
            res.redirect('/admin')
        }
    }

    async book_add_post(req, res) {
        // console.log('req.body', req.body);
        if (req.cookieData) {
            new bookModel({
                name: req.body.name,
                author: req.body.author,
                quantity: req.body.quantity,
            }).save().then(bookadded => {
                console.log('book Added', bookadded);
                res.redirect('/admin/bookstable')
            }).catch(err => {
                console.log('Book Add error', err);
            })
        } else {
            res.redirect('/admin')
        }
    }

    async book_edit_post(req, res) {
        if (req.cookieData) {
            try {
                const ID = req.body._id
                console.log(ID, req.body);
                let bookDetails = await bookModel.findByIdAndUpdate({ _id: ID }, { name: req.body.name, author: req.body.author, quantity: req.body.quantity })
                // res.send('hellow')
                if (bookDetails) {
                    res.redirect('/admin/bookstable')
                }

            } catch (error) {
                console.log('book_edit_post Error', error);
            }

        } else {
            res.redirect('/admin')
        }
    }


}

// EXPORTS SECTION
module.exports = new bookController();