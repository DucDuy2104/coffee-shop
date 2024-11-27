const Banner = require('../models/banner');

exports.updateBanner = async (req, res) => {
    try {
        const banners = await Banner.find({})
        if (!banners.length) {
            return res.status(404).json({ status: false, message: 'No banners found' });
        }
        const eBanner = banners[0];
        const { banner , footer1, footer2 } = req.body;
        if(banner) {
            eBanner.banner = banner;
        }
        if(footer1) {
            eBanner.footer1 = footer1;
        }
        if(footer2) {
            eBanner.footer2 = footer2;
        }
        await eBanner.save();
        return res.status(200).json({ status: true, message: 'Banners updated successfully', data: eBanner });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}