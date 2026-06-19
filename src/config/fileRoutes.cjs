const { resolve } = require('node:path');
const express = require('express');

const uploadPath = resolve(__dirname, '..', '..', 'uploads');

console.log('Servindo arquivos estáticos de:', uploadPath);

const fileRoutesConfig = express.static(uploadPath);

module.exports = fileRoutesConfig;
