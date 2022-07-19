const datasValidation = require('./contactDatasSchema');

module.exports = (datas) => {
  const { error } = datasValidation.validate(datas);

  if (error) {
    const { message } = error.details[0];

    return { status: 400, message };
  }

  return true;
};
