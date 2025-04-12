const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.redirect('/principal');
});

router.get('/principal', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registro.html'));
});

router.get('/cambios-registrados', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/exito.html'));
});

router.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/error.html'));
});

module.exports = router;
