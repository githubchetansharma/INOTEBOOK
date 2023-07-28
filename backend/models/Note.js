const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    // creating link of unoque user wiith his notes 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
//  notes schema ke naam ki collection ban jayegi data base mai 
  module.exports = mongoose.model('notes', NotesSchema);