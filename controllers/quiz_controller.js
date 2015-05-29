// GET /Quizes/Question
exports.question = function(req, res){
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /Quizes/Answer
exports.answer = function(req, res){
	if(req.query.respuesta.toLowerCase() === 'roma'){
		res.render('quizes/answer', {respuesta: 'Correcto'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	}
};