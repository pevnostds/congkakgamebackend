const Joi = require("joi");

exports.create = Joi.object().keys({
  soal: Joi.string().max(255).required(),
  jawab_a: Joi.string().max(100).required(),
  jawab_b: Joi.string().max(100).required(),
  jawab_c: Joi.string().max(100).required(),
  jawab_d: Joi.string().max(100).required(),
  jawaban_benar: Joi.string().valid("a", "b", "c", "d").required(),
  nilai: Joi.number().integer().required(),

});

exports.update = Joi.object().keys({
  soal: Joi.string().max(255).required(),
  jawab_a: Joi.string().max(100).required(),
  jawab_b: Joi.string().max(100).required(),
  jawab_c: Joi.string().max(100).required(),
  jawab_d: Joi.string().max(100).required(),
  jawaban_benar: Joi.string().valid("a", "b", "c", "d").required(),
  nilai: Joi.number().integer().required(),

});
