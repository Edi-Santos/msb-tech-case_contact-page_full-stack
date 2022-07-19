const connection = require('./connection');

const COLLECTION = 'contacts';

const addingContact = async (contactDatas) => {
  try {
    const db = await connection();
    await db.collection(COLLECTION).insertOne(contactDatas);

    return 'Contato enviado com sucesso';
  } catch (error) {
    console.log(`Erro no Model || ${error}`);
  }
};

module.exports = {
  addingContact,
};
