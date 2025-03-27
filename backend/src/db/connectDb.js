const mongoose = require('mongoose')
require('dotenv').config({path: './.env'})

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.DB_URL).then(con => {
            console.log('db connented on '+ con.connection.host)
        })
    } catch(error) {
        console.log('unable to connect db ')
    }
}

module.exports = connectDb