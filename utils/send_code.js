const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = async (recieveEmail, name, verificationCode, subTitle) => {
    console.log('Send mail...');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'Coffee Shop ☕️', 
        to: recieveEmail, 
        subject: subTitle,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">Duc Duy Shop</h1>
            </div>
            <div style="padding: 20px; line-height: 1.6;">
                <h2 style="color: #333;">Xin chào ${name}</h2>
                <p style="font-size: 16px;">Bạn đã đăng ký tài khoản thành công tại <strong>'Coffee Shop ☕️'</strong>. Vui lòng nhấn vào nút bên dưới để xác nhận tài khoản của bạn:</p>
                <a href="http://localhost:8000/auth/verify?email=${recieveEmail}&code=${verificationCode}" 
                   style="display: inline-block; margin-top: 20px; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                   Xác nhận tài khoản
                </a>
                <p style="margin-top: 20px; font-size: 14px; color: #555;">Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.</p>
            </div>
            <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 14px; color: #777;">
                © 2024 Duc Duy Shop. All rights reserved.
            </div>
        </div>
        `
    };

    await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
}

module.exports = { sendEmail }
