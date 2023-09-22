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


Mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB is connected')
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server listening on ${process.env.SERVER_PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })