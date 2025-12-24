const bcrypt = require('bcryptjs');

// SUSTITUYE 'mi_clave_secreta' por la contraseña que quieras usar para entrar
const miPassword = 'Adm@gora$'; 

// Este proceso encripta la clave
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(miPassword, salt);

console.log("--- COPIA EL SIGUIENTE TEXTO ---");
console.log(hash);
console.log("");