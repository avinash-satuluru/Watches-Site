const mongoose = require('mongoose')

const watchesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: ["Analog", "Digital", "Hybrid", "Smartwatch"],
    },

    gender: {
        type: String,
        required: true,
        enum: ["Men", "Women", "Unisex"],
    },

    price: {
        type: Number,
        required: true,
        min: 10
    },

    description: {
        type: String,
        default: 'goodwatches'
    },

    imageUrl: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('watch', watchesSchema)