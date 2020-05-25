const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => {
    res.send('Opa')
})
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Projeto iniciado na porta ${port}`)
})

