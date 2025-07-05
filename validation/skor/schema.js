const Joi = require("joi");

exports.create = Joi.object().keys({
  userId: Joi.number().integer().required(),
  total_nilai: Joi.number().integer(5).required(),
  tanggal: Joi.date().required(),
});

exports.update = Joi.object().keys({
  userId: Joi.number().integer().required(),
  total_nilai: Joi.number().integer(5).required(),
  tanggal: Joi.date().required(),
});
