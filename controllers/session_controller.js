// MW de autorización de accesos a HTTP restingidos
exports.loginRequired = function(req, res, next){
	if(req.session.user){
		next();
	}else {
		res.redirect('/login');
	}
};

// GET / login / formulario de login
exports.new = function(req, res){	
		var errors = req.session.errors || {};
		req.session.errors = {};
		res.render('sessions/new', { errors: errors });	
};

// POST / login / -- Crear la session del usuario
exports.create = function(req, res){
		var login = req.body.login;
		var password = req.body.password;
		var userController = require('./user_controller');
		userController.autenticar(login, password, function(error, user){
			if(error){
				req.session.errors = [{"message": "Se ha Producido un Error: " + error}];
				res.redirect("/login");
				return;
			}
			req.session.user = { id: user.id, username: user.username, tiempo: new Date().getMinutes() };			
			res.redirect(req.session.redir.toString());//redirecciona al path anterior de login
		});
};

// DELETE /logout  == Destruir la session
exports.destroy = function(req, res){		
		delete req.session.user;
		res.redirect(req.session.redir.toString());	
};