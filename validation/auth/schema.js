const Joi = require("joi");

exports.create = Joi.object().keys({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .email()
    .pattern(/@(gmail\.com|yahoo\.com)$/),
  password: Joi.string().min(8).max(20).required(),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).required(),
  role: Joi.string().valid("player", "admin").required(),
});

exports.update = Joi.object().keys({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .email()
    .pattern(/@(gmail\.com|yahoo\.com)$/),
  password: Joi.string().min(8).max(20).required(),
  role: Joi.string().valid("player", "admin").required(),
});
