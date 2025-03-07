const mongoose = require('mongoose')

let cachedDB
const uri = process.env.MONGODB_URI
if (!uri){
    throw new Error('Please add URI to env vars')
}

async function connectToDatabase() {
    if(cachedDB){
        return cachedDB
    }
    console.log('Creating new DB connection')
    cachedDB = mongoose.connect( uri )
    
    return cachedDB
}


module.exports = connectToDatabase
