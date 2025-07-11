const Joi = require("joi");

exports.create = Joi.object().keys({
  userId: Joi.number().integer().required(),
  total_nilai: Joi.number().integer().required(),
  tanggal: Joi.date().required(),
  gameId: Joi.string().min(1).required(),
  namaPemain: Joi.string().min(1).required(),
  skorLumbung: Joi.number().integer().required(),
});

exports.update = Joi.object().keys({
  userId: Joi.number().integer().required(),
  total_nilai: Joi.number().integer().required(),
  tanggal: Joi.date().required(),
  gameId: Joi.string().min(1).required(),
  namaPemain: Joi.string().min(1).required(),
  skorLumbung: Joi.number().integer().required(),
});
