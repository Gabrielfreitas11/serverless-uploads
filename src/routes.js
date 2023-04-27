const AutoHandler = require("../common/handler/AutoHandler");

// Com o AutoHandler é exportado por este arquivo um
// método para cada pasta no diretório configurado abaixo
const dir = `${__dirname}/controllers`;

module.exports = AutoHandler(dir);
