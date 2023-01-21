const bookModel = require('../../../src/model/Books_model/books.model');
const jwt = require('jsonwebtoken');
const bookingModel = require('../../model/transaction_model/transaction.model');
const { default: mongoose } = require('mongoose');

class userBookscontroller {
    async index(req, res) {
        try {
            const message = req.flash('message');
            let books = await bookModel.find({});
            // console.log(books);
            if (books) {
                // console.log('zzz',books);
                if (req.cookies && req.cookies.userToken) {
                    jwt.verify(req.cookies.userToken, 'USER_TOKEN_KEY', (err, data) => {
                        if (err) {
                            console.log('jwt token invalid', err);
                            res.render('user_Books/index', { login: false, books, message });

                        } else {
                            res.render('user_Books/index', { login: true, books, message });
                        }
                    })
                } else {
                    res.render('user_Books/index', { login: false, books, message });
                }
            } else {
                res.render('user_Books/index', { login: false, books: 0, message })

            }
        } catch (error) {
            console.log('render index error :', error);
        }
    }

    async bookNow_post(req, res) {
        try {
            if (req.cookieData) {
                // console.log(req.cookieData.id);
                const userData = req.cookieData
                const ID = req.body.id;
                // console.log(ID);
                let book = await bookModel.findById({ _id: ID, isDeleted: false }).exec();
                // console.log(book);
                if (book && book._id && book.quantity > 0) {
                    let bookTransaction = await bookingModel.create({ user_id: userData.id, book_id: book._id });

                    // console.log(bookTransaction);
                    if (bookTransaction && bookTransaction._id) {
                        const updateBookQuantity = await bookModel.findByIdAndUpdate({ _id: book._id }, { $inc: { quantity: -1 } })
                        // console.log(updateBookQuantity);
                        req.flash('message', 'Successfully Booked')
                        res.redirect('/');
                    } else {
                        console.log('Something went wrong');
                        req.flash('message', 'Something went wrong')
                        res.redirect('/');
                    }
                } else {
                    console.log('Book not Found or it has been out of Stock');
                    req.flash('message', 'Book not Found or it has been out of Stock')
                    res.redirect('/');
                }

            } else {
                res.redirect('/signin')
            }




        } catch (error) {
            console.log('Book Now Error', error);
        }
    }

    async collected_books(req, res) {
        if (req.cookieData) {
            let userBookingData = await bookingModel.aggregate([
                {
                    $match: {
                        user_id: mongoose.Types.ObjectId(req.cookieData.id)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user_data'
                    }
                },
                {
                    $lookup: {
                        from: 'books',
                        localField: 'book_id',
                        foreignField: '_id',
                        as: 'book_data'
                    }
                },
                { $unwind: '$user_data' },
                { $unwind: '$book_data' },
                { $sort: {_id: -1} }

            ])
            if (userBookingData && userBookingData.length) {
                //    console.log(userBookingData);
                res.render('user_Books/callected_books', { login: true, books: 0, userBookingData })

            } else {

            }
        } else {
            res.redirect('/signin')
        }
    }


    async submitBooks(req, res) {
        try {
            const bookingData = await bookingModel.findById(req.body.id);
            console.log("bookingData", bookingData);
            if (bookingData && bookingData._id) {
                const updateBookingData = await bookingModel.findByIdAndUpdate(bookingData._id, { book_submit_Date: new Date() });
                if (updateBookingData && updateBookingData._id) {
                    const updateBookQuantity = await bookModel.findByIdAndUpdate({ _id: updateBookingData.book_id }, { $inc: { quantity: 1 } })
                    res.redirect('/collected_books')
                } else {
                    res.redirect('/collected_books');
                }
            } else {
                res.redirect('/collected_books');
            }
        } catch (error) {
            res.redirect('/signin')
        }
    }
}

// EXPORTS
module.exports = new userBookscontroller();