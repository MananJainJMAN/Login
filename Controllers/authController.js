const User = require('../Models/userModel');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { error } = require('console');
const util = require('util')
const sendEmail = require('../Utils/Email')
exports.login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        // // If the user doesn't exist, generate a random password;
        

        // Create a new user with the random password
        const newUser = await User.create({ email, password: password });
        
     

        return res.status(201).json({ status: 'User Created', message: 'New account created',  });
    }

    // Check if the password matches
    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) {
        // If the password doesn't match, prompt user to reset password
        return res.status(401).json({ status: 'error', message: 'Invalid email or password. Please reset your password.' });
    }

    // If user exists and password matches, generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    });

    // Send token in response
    res.status(200).json({ status: 'success', token });
});


exports.forgotPassword = asyncErrorHandler(async (req,res,next)=>
{
   //1.get user based on posted email

   const user = await User.findOne({email: req.body.email})
   if(!user)
   {
    
    next(error("we couldn't find the user"));
   }
   
   //2. generate a random reset token

   const resetToken = user.createResetPasswordToken()
   await user.save();

   //3. send the token back to the email
   const resetURl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
  const message = `We have recieved a password reset request. Please use the below given link to change the password\n\n${resetURl}`
  console.log(resetURl)  
  try{ 
  await sendEmail(
    {
        email: user.email,
        subject: 'Password change request recieved',
        message:message

    })
    res.status(200).json(
        {
            status:'success',
            message:'Password reset link send to the user email'
        }
    )
}
catch(err)
{
   user.passwordResetToken = undefined
   user.PasswordResetTokenExpired = undefined
   user.save()

   return next(error('There is an error'))

}
})

exports.resetPassword =(req,res,next)=>
{

}
