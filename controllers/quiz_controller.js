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
		res.render('quizes/index', { quizes: quizes });
	}).catch(function(error) { next(error); });	
};

// GET /Quizes/:Id
exports.show = function(req, res){	
	res.render('quizes/show', { quiz: req.quiz });	
};

// GET /Quizes/:Id/Answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){	
		var resultado = 'Incorrecto'		
		if(req.query.respuesta.toLowerCase() === req.quiz.respuesta){
			resultado = 'Correcto';
		} 
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
	});	
};

// GET /New
exports.new = function(req, res){	
	var quiz = models.Quiz.build({pregunta: 'Pregunta',  respuesta: 'Respuesta'});
	res.render('quizes/new', { quiz: quiz });	
};

// POST / quizes / Create
exports.create = function(req, res){	
	var quiz = models.Quiz.build( req.body.quiz );
	quiz.respuesta = quiz.respuesta.toLowerCase();
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){res.redirect('/quizes');});	
};