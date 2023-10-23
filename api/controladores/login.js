const { Router } = require('express');
const jwt = require('jsonwebtoken');
const llave = require("../auth/llave");
const router = new Router();
const models = require('../../database/models');

//Método que realiza un token si el usuario y contraseña son correctos
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) { res.status(400).json({ msg: 'Formato incorrecto: ${JSON.stringify(req.body)}' }); return; }
  models.usuarios.findOne({ where: { nombre: username } }).then(response => {
      if (response.password == password) {
          let token = jwt.sign({ id: response.id }, llave);
          res.json({ msg: "ok", token: token });
      }
      else{
          res.status(401).json({ msg: 'Password incorrecto'});
      }
  }).catch(error=>{
      res.status(401).json({ msg: "Usuario no encontrado"  });
      return;
  })
});

module.exports = router;