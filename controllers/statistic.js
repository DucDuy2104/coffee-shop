const Order = require('../models/order')
const User = require('../models/user')
const OrderDetail = require('../models/order_detail')

exports.ordersStatistic = async (req, res) => {
    try {
        var { year } = req.query;
        
        if (!year) {
            const orders = await Order.find({ status: 'completed' });
            const countOrders = orders.length;

            let details = await OrderDetail.find().populate('order');
            details = details.filter((detail) => detail.order.status === 'completed');

            const totalIncome = orders.reduce((total, order) => total + order.total, 0)
            const totalProducts = details.reduce((total, detail) => total + detail.quantity, 0);

            return res.status(200).json({
                status: true,
                message: 'Orders statistics',  
                data: {
                    totalOrder: countOrders,
                    totalIncome: totalIncome,
                    totalProducts: totalProducts
                }
            });
        }

        const ordersStatistic = [];

        year = parseInt(year);

        if (isNaN(year)) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid year provided' 
            });
        }

        for (let i = 1; i <= 12; i++) {
            let start = new Date(`${year}-${i.toString().padStart(2, '0')}-01T00:00:00.000Z`);
            let end = new Date(`${year}-${(i + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`);
            
            if (i === 12) {
                end = new Date(`${year + 1}-01-01T00:00:00.000Z`);
            }

            const orders = await Order.find({
                status: 'completed',
                createdAt: { $gte: start, $lt: end },
            });

            let details = await OrderDetail.find({
                createdAt: { $gte: start, $lt: end }
            }).populate('order');

            details = details.filter((detail) => detail.order.status === 'completed');

            const totalIncome = orders.reduce((total, order) => total + order.total, 0)
            const totalProducts = details.reduce((total, detail) => total + detail.quantity, 0);

            ordersStatistic.push({
                month: i,
                totalOrder: orders.length,
                totalIncome: totalIncome,
                totalProducts: totalProducts,
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Monthly orders statistic',
            data: ordersStatistic
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};


exports.accountsStatistic = async (req, res) => {
    try {
        const { year } = req.query
        if (!year) {
            const userCount = await User.countDocuments();
            return res.status(200).json({
                status: true, message: 'Accounts statistic', data: {
                    totalUser: userCount
                }
            })
        }

        const accountsStatistic = [];
        for (let i = 1; i <= 12; i++) {
            let start = new Date(`${year}-${i.toString().padStart(2, '0')}-01T00:00:00.000Z`);
            let end = new Date(`${year}-${(i + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`);
            
            if (i === 12) {
                end = new Date(`${year + 1}-01-01T00:00:00.000Z`);
            }

            const userCount = await User.countDocuments({
                createdAt: { $gte: start, $lt: end }
            });

            accountsStatistic.push({
                month: i,
                totalUser: userCount
            });
        }
        return res.status(200).json({ status: true, message: 'Monthly accounts statistic', data: accountsStatistic })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
}

