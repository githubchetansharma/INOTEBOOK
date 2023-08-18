const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://chetanpanditt48:sahayata@cluster0.krp9ax1.mongodb.net/inotebookdata?retryWrites=true&w=majority"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log(`Connected to Mongo Successfully ${mongoose.connection.host}`);
    })
}
module.exports = connectToMongo;   