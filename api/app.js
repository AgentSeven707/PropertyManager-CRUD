const express = require("express");
const morgan = require('morgan');
const app = express();
const fs = require("fs");
const https = require("https");
const cors = require('cors');
const { login } = require("./controladores/login");
app.use(cors());

process.env.port = 4000;
app.set("json spaces",2);

const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");
const credenciales = {
 key: llavePrivada,
 cert: certificado,
 passphrase: "1168349" //passwd de la llave privada usado en la creación del certificado
};

// MIDDLEWARES
const middlewares = {
    morgan: app.use(morgan('dev')),
    urlencoded: app.use(express.urlencoded({extended: false})),
    json: app.use(express.json())
}

// ROUTES
const routes = {
    propiedades: app.use(require('./controladores/propiedades')),
    propietarios: app.use(require('./controladores/propietarios')),
    arrendatarios: app.use(require('./controladores/arrendatarios')),
    usuarios: app.use(require('./controladores/usuarios')),
    login: app.use(require('./controladores/login'))
}

const httpsServer = https.createServer(credenciales, app, middlewares, routes);

httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});
