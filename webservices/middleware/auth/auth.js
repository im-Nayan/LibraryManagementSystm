const jwt = require('jsonwebtoken');

exports.checkAuth = (req,res,next)=>{
    // console.log('zzzz');
    if(req.cookies && req.cookies.userToken){
        jwt.verify(req.cookies.userToken , 'USER_TOKEN_KEY',(err,data)=>{
            // console.log(data);
            if(!err){
                // console.log('user token is verified');
                req.cookieData =data
                next();
            }else{
                console.log('user token is not verified',err);
                res.redirect('/signin')
            }
        })
    }else{
        res.redirect('/signin')
    }

}
