const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, "public/main.js")))

app.set('views','./views')

app.set('view engine', 'ejs')

const cors = require('cors')

app.use( cors() )
// middleware
// Adding body-parser as a middleware
app.use(bodyparser.urlencoded( {extended:false} ))
app.use(bodyparser.json())

// mongoose middleware

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Tushar:Tushar@cluster0.f0ublmt.mongodb.net/accounts?retryWrites=true&w=majority')
    .then(console.log('connection established'))
    .catch((err)=>console.error(err))

app.get('/',(req, res)=>{
    res.status(200).send({message:"Welcome  to our website"})
}
)
const signup=require('./routes/signup')
app.use('/signup',signup)


app.use(express.static(path.join(__dirname,'public/login/log.js')))
app.use(express.static(path.join(__dirname,'public/login/login.css')))

const login = require('./routes/login')
app.use('/login',login)


const products=require('./routes/product')
app.use('/product',products)


const Practice=require('./routes/practice')
app.use('/practice',Practice)

app.use((req, res,) => {
    res.status(404).json({message:"error occured"})
})

module.exports =app;