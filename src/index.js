const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const user = require('./Router/Router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(user)
let url = "mongodb+srv://albertosilva:1uUmREAwMgq4H6io@codex-ieipq.mongodb.net/test?retryWrites=true&w=majority"
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na Ligação ao MongoDB'));

app.get('/', (req, res) => {
    res.send('Bem Vindo')
})
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Projeto iniciado na porta ${port}`)
}) 

