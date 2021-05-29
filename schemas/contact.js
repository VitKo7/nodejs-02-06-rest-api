const mongoose = require('mongoose');
const { Schema } = mongoose;

const contact = new Schema(
    {
        name: {
            type: String,
            minlength: 2,
            maxlength: 70,
            required: [true, 'Set name for the contact'],
        },
        email: {
            type: String,
            minlength: 5,
            maxlength: 70,
            unique: true,
            required: [true, 'Email is required'],
            validate(value) {
                const re = /\S+@\S+\.\S+/;
                return re.test(String(value).toLowerCase());
            },
        },
        phone: {
            type: String,
            minlength: 3,
            maxlength: 70,
            required: [true, 'Phone is required'],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        age: {
            type: Number,
            min: 18,
            max: 150,
            required: [true, 'Age is required'],
        },
        experience: {
            type: Number,
            min: 0,
            max: 100,
            required: [true, 'Experience is required'],
        },
        children: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
        },
    },
    { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('contact', contact);

module.exports = Contact;
