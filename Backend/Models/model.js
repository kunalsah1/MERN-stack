const mongoose = require('mongoose')


const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    dateJoined:{
        type:String,
        required:true
    },
},
{
    timestamp:true
}
)




module.exports = Employee = mongoose.model('employee', employeeSchema)