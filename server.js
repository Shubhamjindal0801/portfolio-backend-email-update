const express = require('express')
const Mongoose = require('mongoose')
const cors = require('cors')
const UserRoutes = require('./routes/UserRoutes')
require('dotenv').config()

const app = express()
app.use(express.json())

app.use(
    cors({
        origin: "*"
    })
)

app.use('/user',UserRoutes)


Mongoose.connect('mongodb+srv://Shubham_0801:shubu0801@cluster0.9p799jp.mongodb.net/portfolio?retryWrites=true&w=majority')
    .then(() => {
        console.log('MongoDB is connected')
        app.listen(8004, () => {
            console.log(`Server listening on 8004`)
        })
    })
    .catch((err) => {
        console.log(err)
    })