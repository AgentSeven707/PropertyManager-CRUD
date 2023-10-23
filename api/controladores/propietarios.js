const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const models = require('C:\\Users\\Princ\\Desktop\\JavaScript\\Meta2.4.js\\main\\models');

//Metodo READ
router.get('/propietarios', (req, res) => {
    models.personas.findAll().then(personas=>{ res.send(personas) })
});

//Metodo CREATE 
router.post('/propietarios', (req, res) => {
    const {nombre , rfc} = req.body;
    const persona = models.personas.create({ nombre: req.body.nombre, rfc: req.body.rfc });
    if (nombre && rfc) { res.json(persona); } else { res.send('wrong'); }
});

//Metodo UPDATE
router.put('/propietarios/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, rfc} = req.body;
    models.personas.update({nombre:nombre, rfc:rfc},{ where: { id:id } }).then(personas=>{ res.send(personas) })
});

//Metodo DELETE
router.delete('/propietarios/:id', (req, res) => {
    const { id } = req.params;
    models.personas.destroy({ where:{ id:id } }).then(personas=>{ res.send("Elemento con el id = "+id+" ha sido eliminado.") })
})

module.exports = router;