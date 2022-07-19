const Contact = require('../models/Contact');

const addingContact = async (contactDatas) => Contact.addingContact(contactDatas);

module.exports = {
  addingContact,
};
