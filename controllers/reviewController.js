const Review = require('../models/Review');
const Product = require('../models/Product');

exports.createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();

        const product = await Product.findById(req.body.productId);
        product.reviews.push(review._id);
        await product.save();

        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};