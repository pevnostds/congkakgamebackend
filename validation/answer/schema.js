const Joi = require("joi");

exports.create = Joi.object().keys({
  userId: Joi.number().integer().required(),
  questionId: Joi.number().integer().required(),
  jawaban: Joi.string().max(1).required(),
});

exports.update = Joi.object().keys({
  userId: Joi.number().integer().required(),
  questionId: Joi.number().integer().required(),
  jawaban: Joi.string().max(1).required(),
});
