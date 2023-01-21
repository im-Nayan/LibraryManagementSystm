const bookingModel =require('../../../webservices/model/transaction_model/transaction.model');
const userModel = require('../../../webservices/model/user_sign_model/user_sign.model');
class dashboardController{
    async dashboard(req,res){
        if (req.cookieData) {
            
            // res.send('hellow')
            const userDetails = await userModel.find().exec()
            console.log(userDetails);
            if (userDetails && userDetails.length) {
                res.render('Dashboard/dashboard',{userDetails})
                
            } else {
                res.render('Dashboard/dashboard',{userDetails:0})
                
            }
        }else{
            res.redirect('/admin')
        }
    }
    async userDelete(req,res){
        if (req.cookieData) {
            
            const ID = req.params.id
            // console.log(ID);
            let userDetails = await userModel.findByIdAndUpdate({ _id: ID }, { isDeleted: true })
            // res.send('hellow')
            if (userDetails) {
                res.redirect('/admin/dashboard');
            }else{
                
                res.redirect('/admin/dashboard');
            }
        }else{
            res.redirect('/admin')
        }
    }
    async allTransaction(req,res){
        if (req.cookieData) {
            
            // res.send('hellow')
            let userBookingData = await bookingModel.aggregate([
                
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
            res.render('Dashboard/allTransaction', { login: true,userBookingData })
        }else{
            res.redirect('/admin')
        }
    }
}

// EXPORTS SECTION
module.exports = new dashboardController()