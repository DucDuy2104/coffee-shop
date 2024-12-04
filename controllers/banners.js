const Banner = require('../models/banner');

exports.updateBanner = async (req, res) => {
    try {
        var banners = await Banner.find({})
        if (banners.length > 0) {
            const createdBanner = await Banner.create({
                "banner": "https://static.vecteezy.com/system/resources/previews/010/566/757/non_2x/international-coffee-day-banner-design-with-wooden-background-illustration-vector.jpg",
                "footer1": "https://static.vecteezy.com/system/resources/previews/012/025/024/non_2x/coffee-banner-ads-retro-brown-style-with-latte-and-coffee-beans-3d-realistic-simple-vector.jpg",
                "footer2": "https://i.pinimg.com/736x/2e/d9/be/2ed9be4c75de693b75bacd6ed3594b31.jpg",
            })
            banners = [createdBanner]
        }
        const eBanner = banners[0];
        const { banner , footer1, footer2 } = req.body;
        if(banner && banner != "") {
            eBanner.banner = banner;
        }
        if(footer1 && footer1 != "") {
            eBanner.footer1 = footer1;
        }
        if(footer2 && footer2 != "") {
            eBanner.footer2 = footer2;
        }
        await eBanner.save();
        return res.status(200).json({ status: true, message: 'Banners updated successfully', data: eBanner });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
}

exports.getBanners = async (req,res) => {
    try {
        var banners = await Banner.find({})
        if (banners.length > 0) {
            const createdBanner = await Banner.create({
                "banner": "https://static.vecteezy.com/system/resources/previews/010/566/757/non_2x/international-coffee-day-banner-design-with-wooden-background-illustration-vector.jpg",
                "footer1": "https://static.vecteezy.com/system/resources/previews/012/025/024/non_2x/coffee-banner-ads-retro-brown-style-with-latte-and-coffee-beans-3d-realistic-simple-vector.jpg",
                "footer2": "https://i.pinimg.com/736x/2e/d9/be/2ed9be4c75de693b75bacd6ed3594b31.jpg",
            })
            banners = [createdBanner]
        }
        return res.status(200).json({ status: true, message: 'Banners retrieved successfully', data: banners[0] });
    } catch (error) {
        
    }
}