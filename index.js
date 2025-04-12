const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const route = require('./routes/rutas');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended: false})); // Para poder realizar peticiones POST
app.set('view engine', 'ejs'); // Para usar ejs
app.set('views', path.join(__dirname, 'views')); // Para acceder a los ejs de la carpeta views
app.use(express.static(path.join(__dirname, 'public'))); // Para acceder a los archivos estáticos

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libreria',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log('Error connection')
    } else {
        console.log('Connection success')
    }
});

app.use('/', route); // Se usa el archivo rutas.js

app.post('/agregar', (req, res) => {
    const { titulo, autor, categoria, anyo, paginas, precio, stock } = req.body; // Se obtienen los datos del formulario
    const query = `INSERT INTO libros (titulo, autor, categoria, anyo, paginas, precio, stock) VALUES (?, ?, ?, ?, ?, ?, ?)`; // Se crea la consulta
    connection.query(query, [ titulo, autor, categoria, anyo, paginas, precio, stock ],(err) => {
        if (err) {
            res.redirect('/error');
            console.log(err);
        } else {
            res.redirect('/cambios-registrados');
        }
    });
});

// Se dirige a la vista consulta
app.get('/libros', (req, res) => {
    const query = 'SELECT * FROM libros';
    connection.query(query, (err, libros) => {
        if (err) {
            res.redirect('/error');
        } else {
            res.render('libros', {libreria: libros}); // Se envía la variable libros a la vista consulta.ejs
        }
    });
});

// Se dirige a la informacion del libro seleccionado
app.get('/consulta/:id', (req, res) => {
    const { id } = req.params; // Se obtiene el id de la URL
    const query = 'SELECT * FROM libros WHERE id = ?'; // Se crea la consulta
    connection.query(query, [ id ], (err, libro) => {
        if (err) {
            res.redirect('/error');
        } else {
            res.render('editar', {libro: libro[0]});
        }
    });
});

// Se guarda los cambios realizados en la informacion del libro
app.post('/editar/:id', (req, res) => {
    const { id } = req.params; // Se obtiene el id de la URL
    const { titulo, autor, categoria, anyo, paginas, precio, stock } = req.body; // Se obtienen los datos del formulario
    const query = 'UPDATE libros SET titulo = ?, autor = ?, categoria = ?, anyo = ?, paginas = ?, precio = ?, stock = ? WHERE id = ?';
    connection.query(query, [ titulo, autor, categoria, anyo, paginas, precio, stock, id ], (err) => {
        if (err) {
            res.redirect('/error');
        } else {
            res.redirect('/cambios-registrados');
        }
    });
});

// Se elimina el registro del libro seleccionado
app.get('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM libros WHERE id = ?`;
    connection.query(query, [id], (err) => {
        if (err) {
            res.redirect('/error');
        } else {
            res.redirect('/cambios-registrados');
        }
    });
});

// Se dirige a la vista principal
app.use((req, res) => {
    res.redirect('/principal');
});

app.listen(port);
console.log('Server on port', port);
