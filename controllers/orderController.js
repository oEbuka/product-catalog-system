const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('items.productId');
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


//AGGREGATION PIPELINE
// -- sales report
exports.getSalesReport = async (req, res) => {
    try {
        const sales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$orderDate' } },
                    totalSales: { $sum: '$totalAmount' },
                    totalOrders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        res.status(200).json(sales);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};