
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define person schema:

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ['barista', 'manager', 'waiter', 'food_delivery', 'cleaning'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

//bcrypt : hashing in password
personSchema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10);

        const hashedPass = await bcrypt.hash(person.password, salt);
        person.password = hashedPass;

        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePass = async function(candidatePass){
    try{
        const isMatch = await bcrypt.compare(candidatePass, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//create schema model:

const Person = mongoose.model('person', personSchema);
module.exports = Person;