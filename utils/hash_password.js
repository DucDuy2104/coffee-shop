const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    const saltRounds = 10; // Số lần mã hóa
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error(err);
    }
};


exports.verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        if (isMatch) {
            console.log("Password is correct!");
        } else {
            console.log("Incorrect password!");
        }
        return isMatch;
    } catch (err) {
        console.error(err);
    }
};
