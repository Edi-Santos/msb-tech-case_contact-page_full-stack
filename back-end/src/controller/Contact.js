const Contact = require('../services/Contact');

const addingContact = async (req, res) => {
  try {
    const bodyDatas = req.body;

    const addContact = await Contact.addingContact(bodyDatas);

    return res.status(201).json({ message: addContact });
  } catch (error) {
    console.log(`Erro no Controller || ${error}`);
  }
};

module.exports = {
  addingContact,
};
