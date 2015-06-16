var models = require('../models/models.js');

// Autoloas - factoriza el código si ruta incluye :quizId
/*
exports.load = function(req, res, next, quizId){
	models.Quiz.find({ where: { id: Number(quizId) }, include: [{ model: models.Comment }] }).then(function(quiz){
		if(quiz) {
			req.quiz = quiz;
			next();
	    }else {
			next(new Error('No Existe quizId=' + quizId));
		}
	}).catch(function(error) { next(error); });	
};*/

// GET /statistics
exports.index = function(req, res){		
	/*models.Quiz.findAll().then(function(quizes){
		res.render('statistics/index', { quizes: quizes, errors: [] });
	}).catch(function(error) { next(error); });	*/
	
	models.Quiz.findAll({ include: [{ model: models.Comment }] }).then(function(quizes){				
		res.render('statistics/index', { quizes: quizes, errors: [] });		
	}).catch(function(error) { next(error); });	
};