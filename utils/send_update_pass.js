const nodemailer = require('nodemailer');
require('dotenv').config()

const sendUpdatePassword = async (recieveEmail, name, subTitle) => {
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
        <!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Đặt Lại Mật Khẩu</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-container {
            background-color: #f4f4f4;
            padding: 30px;
            border-radius: 8px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 8px 8px;
        }
        .reset-link {
            display: block;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            text-align: center;
            border-radius: 4px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 0.8em;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Đặt Lại Mật Khẩu</h1>
        </div>
        <div class="content">
            <p>Xin chào ${name},</p>
            <p>Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng nhấn vào liên kết bên dưới để thực hiện:</p>
            
            <a href="http://localhost:8000/users/update-pass-view?email=${recieveEmail}" class="reset-link">
                Đặt Lại Mật Khẩu
            </a>
            
            <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
            <p>Liên kết này sẽ hết hạn sau 1 giờ.</p>
        </div>
        <div class="footer">
            <p>© 2024 Coffee Shop ☕️</p>
        </div>
    </div>
</body>
</html>
        `
    };

    await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
}

module.exports = { sendUpdatePassword }
