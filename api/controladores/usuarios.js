const { Router } = require('express');
const { route } = require('express/lib/router');
const router = new Router();
const _ = require('underscore');
const models = require('C:\\Users\\Princ\\Desktop\\JavaScript\\Meta3.3\\main\\models');

//Metodo READ
router.get('/usuarios', (req, res) => {
    models.usuarios.findAll().then(usuarios=>{ res.send(usuarios) })
});

//Metodo CREATE 
router.post('/usuarios', (req, res) => {
    const {nombre , password} = req.body;
    const usuario = models.usuarios.create({ nombre: req.body.nombre, password: req.body.password });
    if (nombre && password) { res.json(usuario); } else { res.send('wrong'); }
});

//Metodo READ por ID
router.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    models.usuarios.findAll({ where: { id: id } }).then(usuarios => { res.send(usuarios) });
});

module.exports = router;