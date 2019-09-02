const passport = require("passport")

module.exports =  function auth(req, res, next) {
  passport.authenticate('jwt', function(err, user, info) {
    if (err) return next(err)
    if (!user){
    	return res.status(401).json({
    		success: false,
    		message: 'User is not authenticated.'
    	})
    }
    req.user = user
    next();
  })(req, res, next)
}