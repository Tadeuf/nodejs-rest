const express = require('express')
const app = express()
const port = 3000

app.get('/atendimentos', (req, res) => res.send('Pagina inicial do Petshop!'))
app.listen(port, () => console.log(`Example app listening on port port!`))