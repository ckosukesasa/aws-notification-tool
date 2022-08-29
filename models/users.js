// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// New instance of a Schema object: 
// Purpose: Schema should contain all the different elements that our users 
//          object should have
const userSchema = new Schema({
    userId: {
        type: String,
        required: true
    }, 
    userName: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    }, 
    segment: { 
        type: String, 
        required: true
    }
}, { timestamps: true });

// Created model based on schema, name of this model should be the singular of 
// the collection name
const User = mongoose.model('User', userSchema);
// module.exports = User;
export default User;


