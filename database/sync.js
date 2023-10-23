const models = require("./models");

async function inicia() {
    await models.sequelize.sync({force: true});
    console.log("All models were synchronized successfully");
    await models.personas.create({
        nombre: "Eren Jaeger",
        rfc: "EJ1234567"
    });
    await models.personas.create({
        nombre: "Mikasa Ackerman",
        rfc: "MA24RO434"
    });
    await models.personas.create({
        nombre: "Armin Arlert",
        rfc: "AA349R449R9"
    });
    await models.usuarios.create({
        nombre: "Alexandra",
        password: "123"
    });
    const propiedades = [];
    propiedades.push(await models.propiedades.create({
        clave: "123",
        descripcion: "Mansion Hollywood"
    }));
    propiedades.push(await models.propiedades.create({
        clave: "124",
        descripcion: "Mansion de Los Angeles"
    }));
    propiedades.push(await models.propiedades.create({
        clave: "125",
        descripcion: "Mansion de Keanu Reeves"
    }));

    models.sequelize.close();
}
inicia();