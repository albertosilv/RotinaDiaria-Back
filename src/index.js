const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


let url = "mongodb+srv://albertosilva:1uUmREAwMgq4H6io@codex-ieipq.mongodb.net/test?retryWrites=true&w=majority"
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,{ useFindAndModify: false });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na Ligação ao MongoDB'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev"))
app.use(cors())
const port = process.env.PORT || 4000
app.get('/',(req,res)=>{
    res.send('Bem vindo')
})
app.use(require('./Router/auth'))
app.use(require('./Router/Task'))
app.listen(port, () => {
    console.log(`Projeto iniciado na porta ${port}`)
}) 

