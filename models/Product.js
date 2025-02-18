const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stockCount: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    variants: [variantSchema],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    createdAt: { type: Date, default: Date.now },
});

productSchema.index({ name: 'text', description: 'text' }); // simple indexing

module.exports = mongoose.model('Product', productSchema);