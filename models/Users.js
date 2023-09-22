const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const Users = new Schema({
    name: {
        type: String,
        require: true
    },
    phone:{
        type:String,
        require:false
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
},
    {
        strict: false
    }
)


module.exports = Mongoose.model('users',Users)