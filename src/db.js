const mongoose = require('mongoose');

const uri = process.env.MONGO_URI
let client;
let clientPromise;

if (!uri){
    throw new Error('Please add URI to env vars')
}


if (process.env.NODE_ENV == 'dev'){
    if(!global._mogoClientPromise){
        console.log('Creating new DB connection')
        global._mogoClientPromise = mongoose.connect( uri, {useNewUrlParser: true} )
    }
    clientPromise = global._mogoClientPromise
}else{
    client = mongoose.connect( uri, {useNewUrlParser: true} )
    clientPromise = client.connect()
}

module.exports = clientPromise;
