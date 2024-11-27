const crypto = require("crypto");

exports.generateVerificationCode = (size = 12) =>{
    console.log('Render code...')
    return crypto.randomBytes(size).toString("hex");
}
