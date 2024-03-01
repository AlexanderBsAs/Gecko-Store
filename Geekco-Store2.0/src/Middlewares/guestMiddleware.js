function guestMiddleware(req,res,next){
    if(req.session.user){
        res.send('No sos admin disculpa, bichito de lú')
    } else {
        next();
    }

}


module.exports = guestMiddleware;