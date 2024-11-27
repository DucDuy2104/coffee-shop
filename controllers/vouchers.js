const Voucher = require('../models/voucher');

function renderRandomVoucherCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
    }
    return result;
}

exports.createVoucher = async (req, res) => {
    try {
        var { code, discount } = req.body;
        if(!code) {
            code = renderRandomVoucherCode();
        }
        if(!discount || discount <= 0) {
            return res.status(400).json({ status: false, message: 'Invalid discount'})
        }
        const voucher = await Voucher.create({ code, discount})
        return res.status(200).json({ status: true, message: 'Voucher created successfully', voucher: voucher })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: false, message: 'Internal server error'})
    }
}

exports.deleteVoucher = async (req, res) => {
    try {
        const { voucherId } = req.body;
        if(!voucherId) {
            return res.status(400).json({ status: false, message: 'Voucher ID is required'})
        }
        const voucher = await Voucher.findById(voucherId)
        if(!voucher) {
            return res.status(404).json({ status: false, message: 'Voucher not found'})
        }
        voucher.isDeleted = true;
        const deletedVoucher = await voucher.save();
        return res.status(200).json({ status: true, message: 'Voucher deleted successfully', data: deletedVoucher})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: false, message: 'Internal server error'})
    }
}

exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find({ isDeleted: false });
        return res.status(200).json({ status: true, message: 'Vouchers fetched successfully', data: vouchers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

