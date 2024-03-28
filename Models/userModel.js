const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    // Define other fields as needed
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter the Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        // validate: [validator.isStrongPassword,"Too Weak"]
    },
    passwordResetToken: {
        type: String
    },

    PasswordResetTokenExpired: {
        type:Date
    },
    role: {
        type: String,
        enum: ['Admin', 'User'], // Define enum for roles
        required: true
    },
    department: {
        type: String,
        enum: ['HR', 'IT', 'Finance', 'Marketing'], // Define enum for departments
        required: true
    }
});

//hashing before saving
userSchema.pre('save',async function(next)
{
    if(!this.isModified('password'))return next()

    //encrypt the password before saving it
    this.password = await bcrypt.hash(this.password,12);
    next()
})

//authentication
userSchema.methods.comparePassword = async function(pswd,pswdDB)
{
    return await bcrypt.compare(pswd,pswdDB)
}

//Password reset Token
// Password reset Token
userSchema.methods.createResetPasswordToken = function() {
    // Simple unhashed token
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.PasswordResetTokenExpired = Date.now() + 10 * (60 * 1000);

    console.log(this.passwordResetToken, resetToken);

    // User will get the simple token on the mail
    // then we compare

    return resetToken;
};
module.exports = mongoose.model('User', userSchema);
