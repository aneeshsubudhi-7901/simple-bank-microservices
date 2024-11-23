const mongoose = require("mongoose")

const Schema = mongoose.Schema

const accountSchema = Schema({
    accNumber: {
        type: Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    balance:{
        type: Number,
        required: true
    },
    dateCreated:{
        type: Date,
        required:true
    }
})

module.exports = Account = mongoose.model("Account", accountSchema)