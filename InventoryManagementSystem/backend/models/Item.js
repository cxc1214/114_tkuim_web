const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: { type: String },                // 描述 (選填)
    image: { type: String, default: '' },         // 圖片 (選填，儲存 Base64 或 URL)
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
