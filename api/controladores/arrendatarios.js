const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
const models = require('../../database/models');

//Metodo READ
router.get('/arrendatarios', (req, res) => {
    models.personas.findAll().then(personas=>{ res.send(personas) })
});

//Metodo READ por ID
router.get('/arrendatarios/:id', (req, res) => {
    const { id } = req.params; 
    models.personas.findByPk(id).then(personas=>{ res.send(personas) })
});

//Metodo CREATE 
router.post('/arrendatarios', (req, res) => {
    const {nombre , rfc} = req.body;
    const persona = models.personas.create({ nombre: req.body.nombre, rfc: req.body.rfc });
    if (nombre && rfc) { res.json(persona); } else { res.send('wrong'); }
});

//Metodo UPDATE
router.put('/arrendatarios/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, rfc} = req.body;
    models.personas.update({ nombre:nombre, rfc:rfc},{ where: { id:id } }).then(personas=>{ res.send(personas) })
});

//Metodo DELETE
router.delete('/arrendatarios/:id', (req, res) => {
    const { id } = req.params;
    models.personas.destroy({ where:{ id:id } }).then(personas=>{ res.send("Elemento con el id = "+id+" ha sido eliminado.") })
})

module.exports = router;