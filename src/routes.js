const { Router } = require("@impostograma/common");

// Com o AutoHandler é exportado por este arquivo um
// método para cada pasta no diretório configurado abaixo
const dir = `${__dirname}/controllers`;

module.exports = Router(dir);
