const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'tadeu',
    password: 'password',
    database: 'agenda-petshop'
})

module.exports = conexao