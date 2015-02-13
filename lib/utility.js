exports.isLoggedIn = function(req, res, next){
	// if user is authenticated
	if (req.isAuthenticated) {
		return next();
	}
	// if user not authenticated
	else {
		// redirect to '/login' page
		res.redirect('/login');
	}
}