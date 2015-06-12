var models = require('../models/models.js');

// GET /Quizes
exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', { quizes: quizes });
	});	
};

// GET /Quizes/:Id
exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', { quiz: quiz });
	});	
};

// GET /Quizes/:Id/Answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){		
		if(req.query.respuesta.toLowerCase() === quiz.respuesta){
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
		}
	});	
};