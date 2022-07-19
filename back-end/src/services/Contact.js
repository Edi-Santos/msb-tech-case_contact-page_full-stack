const Contact = require('../models/Contact');
const datasValidation = require('../validations/contactDatasValidation');

const addingContact = async (contactDatas) => {
  try {
    const validation = datasValidation(contactDatas);

    if (validation !== true) return validation;

    const addContent = await Contact.addingContact(contactDatas);

    return addContent;
  } catch (error) {
   console.log(`Erro no Service || ${error}`); 
  }
};

module.exports = {
  addingContact,
};
