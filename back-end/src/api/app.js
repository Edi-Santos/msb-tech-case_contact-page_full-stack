const express = require('express');

const Contact = require('../controller/Contact');

const app = express();
app.use(express.json());

app.post('/contact', Contact.addingContact);

module.exports = app;
