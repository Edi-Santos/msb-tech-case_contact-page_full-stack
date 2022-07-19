const Joi = require('joi');

// Expressão regular para validação de números telefônicos brasileiros.
// Link: https://gist.github.com/boliveirasilva/c927811ff4a7d43a0e0c
const cellPhoneRegExp = new RegExp(
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
);

module.exports = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  cellphone: Joi.string().regex(cellPhoneRegExp),
  message: Joi.string().required(),
});
