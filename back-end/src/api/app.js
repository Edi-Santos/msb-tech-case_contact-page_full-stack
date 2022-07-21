const express = require('express');
const cors = require('cors');

const Contact = require('../controller/Contact');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/contact', Contact.addingContact);

module.exports = app;
