var models = require('../models/models.js');

// Autoloas - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if(quiz) {
			req.quiz = quiz;
			next();
	    }else {
			next(new Error('No Existe quizId=' + quizId));
		}
	}).catch(function(error) { next(error); });	
};

// GET /Quizes
exports.index = function(req, res){
	var newV = '';
	if(req.query.search){
		newV = req.query.search.replace(/ /g,'%');		
	}
	models.Quiz.findAll({		
			where: ["pregunta like ?", '%' + newV + '%'],
			order: 'pregunta ASC'
	}).then(function(quizes){
		res.render('quizes/index', { quizes: quizes, errors: [] });
	}).catch(function(error) { next(error); });	
};

// GET /Quizes/:Id
exports.show = function(req, res){	
	res.render('quizes/show', { quiz: req.quiz, errors: [] });	
};

// GET /Quizes/:Id/Answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){	
		var resultado = 'Incorrecto'		
		if(req.query.respuesta.toLowerCase() === req.quiz.respuesta){
			resultado = 'Correcto';
		} 
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
	});	
};

// GET /New
exports.new = function(req, res){	
	var quiz = models.Quiz.build({pregunta: 'Pregunta',  respuesta: 'Respuesta', tema: 'otro'});
	res.render('quizes/new', { quiz: quiz, errors: [] });	
};

// POST / quizes / Create
exports.create = function(req, res){	
	var quiz = models.Quiz.build( req.body.quiz );	
	quiz.validate().then(
		function(err){
			if(err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors });
			}else{
				quiz.respuesta = quiz.respuesta.toLowerCase();
				quiz.save({fields: ["pregunta","respuesta", "tema"]}).then(function(){res.redirect('/quizes');});	
			}
		}
	);
	
};

// GET / edit
exports.edit = function(req, res){	
	var quiz = req.quiz; // autoload de instancia de quiz	
	res.render('quizes/edit', { quiz: quiz, errors: [] });	
};

// PUT / quizes / Update
exports.update = function(req, res){	
	req.quiz.pregunta  = req.body.quiz.pregunta; 
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;	
	req.quiz.validate().then(
		function(err){			
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors });
			}else{
				req.quiz.respuesta = req.quiz.respuesta.toLowerCase();		
				req.quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function(){res.redirect('/quizes');});	
			}
		}
	);	
};

// DELETE  / quizes / id
exports.destroy = function(req, res){	
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){ next(error); });
};