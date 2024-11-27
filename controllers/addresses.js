const Address = require('../models/address')


exports.createAddress = async (req, res) => {
    try {
        const { userId, address, phone, recipientName } = req.body;
        if(!address || !phone || !recipientName) {
            return res.status(400).json({ status: false, message: 'Address, phone, and recipient name are required' });
        }
        const savedAddress = await Address.create({
            user: userId,
            address: address,
            phone: phone,
            recipientName: recipientName
        }) 
        return res.status(200).json({ status: true, message: 'Address created successfully', data: savedAddress });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.body;
        if(!addressId) {
            return res.status(400).json({ status: false, message: 'Address ID is required' });
        }
        const address = await Address.findById(addressId);
        if(!address) {
            return res.status(404).json({ status: false, message: 'Address not found' });
        }
        address.isDeleted = true;
        const deletedAddress = await address.save();
        return res.status(200).json({ status: true, message: 'Address deleted successfully', data: deletedAddress });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.updateAddress = async (req, res) => {
    try {
        const { addressId, address, phone, recipientName } = req.body;
        const tempAddress = await Address.findById(addressId);
        if(!tempAddress) {
            return res.status(404).json({ status: false, message: 'Address not found' });
        }
        if(address) {
            tempAddress.address = address;
        }
        if(phone) {
            tempAddress.phone = phone;
        }
        if(recipientName) {
            tempAddress.recipientName = recipientName;
        }
        const updatedAddress = await tempAddress.save();
        return res.status(200).json({ status: true, message: 'Address updated successfully', data: updatedAddress });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}


exports.getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({ status: false, message: 'User ID is required' });
        }
        const addresses = await Address.find({ user: userId, isDeleted: false });
        return res.status(200).json({ status: true, message: 'Addresses retrieved successfully', data: addresses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}