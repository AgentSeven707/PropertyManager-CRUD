const { Router } = require('express');
const { json } = require('express/lib/response');
const router = new Router();
const _ = require('underscore');
const personas = require('../../main/models/personas');
const models = require('C:\\Users\\Princ\\Desktop\\JavaScript\\Meta2.4.js\\main\\models');

//Metodo READ
router.get('/propiedades', (req, res) => {
    models.propiedades.findAll({ include:{ model: models.personas, as: "arrendatario" } }).then(propiedades=>{ res.send(propiedades); })
});

//Metodo CREATE 
router.post("/propiedades", (req, res) => {
    models.propiedades.create({ clave: req.body.clave, descripcion: req.body.descripcion }).then(propiedades =>{ res.send(propiedades); });
});

//Metodo UPDATE
router.put('/propiedades/:id', (req, res) => {
    const { id } = req.params;
    const {clave, descripcion} = req.body;
    models.propiedades.update({clave:clave, descripcion:descripcion},{ where: { id:id } }).then(propiedades=>{ res.send(propiedades) })
});

//Metodo DELETE
router.delete('/propiedades/:id', (req, res) => {
    const { id } = req.params;
    models.propiedades.destroy({ where:{ id:id } })
    .then(propiedades=>{ res.send("Elemento con el id = "+id+" ha sido eliminado.") })
})

//Metodo ASIGNAR PROPIETARIO A PROPIEDAD
router.put('/propiedades/propietarios/:clave/:rfc', (req, res) => {
    const { clave, rfc } = req.params;
    models.propiedades.findOne({ where: { clave: clave } }).then(propiedad => {
        models.personas.findOne({ where: { rfc: rfc } }).then(propietario => { propietario.addPropiedad(propiedad); res.send(propiedad)
        }).catch(error => { res.status(400).send({ message: "error" }) });
    }).catch(error => { res.status(400).send({ message: "error" }) });
});

//Metodo ASIGNAR ARRENDATARIO A PROPIEDAD
router.put('/propiedades/arrendador/:clave/:rfc', (req, res) => {
    const { clave, rfc } = req.params;
    models.propiedades.findOne({ where: { clave: clave }}).then(propiedad => {
        models.personas.findOne({ where: { rfc: rfc } }).then(arrendatario => { propiedad.setArrendatario(arrendatario); res.send(propiedad)
        }).catch(error => { res.status(400).send({ message: "error" }) });
    }).catch(error => { res.status(400).send({ message: "error" }) });
});

//Metodo DESARRENDAR ARRENDATARIO DE PROPIEDAD
router.put('/propiedades/desarrendar/:clave', (req, res) => { res.json(yes2(req,res)); });
async function yes2 (req,res){
    const { clave } = req.params;
    models.propiedades.findOne({where: {clave: clave}}).then(propiedad => { propiedad.setArrendatario(null); return propiedad; });
}

//Metodo READ PROPIETARIOS por ID
router.get('/propiedades/propietarios/:id', (req, res) => {
    const { id } = req.params;
    models.propiedades.findByPk(id).then(propiedad =>{ propiedad.propietario.findAll().then(propietario => { res.send(propietario); }); })
});

module.exports = router;