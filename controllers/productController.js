const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('reviews');
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('reviews');
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//AGGREGATION PIPELINES
// --Product stats
exports.getProductStatistics = async (req, res) => {
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    totalStock: { $sum: { $sum: '$variants.stockCount' } },
                },
            },
        ]);
        res.status(200).json(stats);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//  --category analysis
exports.getCategoryAnalysis = async (req, res) => {
    try {
        const analysis = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 },
                    averageRating: { $avg: { $avg: '$reviews.rating' } },
                },
            },
        ]);
        res.status(200).json(analysis);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};