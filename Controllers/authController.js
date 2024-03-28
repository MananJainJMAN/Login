const User = require('../Models/userModel');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { error } = require('console');
const util = require('util')
const sendEmail = require('../Utils/Email')
const crypto = require('crypto')
const generator = require('generate-password');
const emailTemplate = require('../Utils/EmailTemplate')

//createUser
exports.createUser = asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body
    const {role} = req.body
    const {department} = req.body

    // Generate a random password for the new user
    const randomPassword = generator.generate(
        {
            length:10,
            strict:true
        }
    )



    const newUser = await User.create({ email, password: randomPassword , role:role, department:department });

    // Send the random password to the user's email along with the password reset link
    const resetToken = newUser.createResetPasswordToken();
    await newUser.save();
    const resetURL = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`;
   // In your function
    const message = emailTemplate.replace('{{resetURL}}', resetURL);

    
    try {
        await sendEmail({
            email: newUser.email,
            subject: 'Welcome to the platform!',
            message: message
        });
        res.status(201).json({ status: 'success', message: 'New account created. Check your email for login details.' });
    } catch (error) {
        return next(new Error('Error sending email. Please try again later.'));
    }
});

//login 
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

    await user.save();

    // Send token in response
    res.status(200).json({ status: 'success', token });
});


//forget Password
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
   const resetURl = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`
    // In your function
    const message = emailTemplate.replace('{{resetURL}}', resetURL);

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


//ResetPasswordToken
exports.resetPassword = asyncErrorHandler( async (req,res,next)=>
{

    //token encrypt
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    // it will found the same request token with greater expiry time
    const  user = await User.findOne({passwordResetToken:token});


    if(!user)
    {
        res.status(400).json(
            {
                 status:"Invalid token or something wrong",
                    
            })

    }
// update the password & update the resettokens
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.PasswordResetTokenExpired = undefined

    user.save()
    console.log("token saved")
// login the user
const Logintoken = jwt.sign({ id: user._id }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES
});

res.status(200).json(
{
     status:"success",
        Logintoken

})
 })

 // Delete User
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id; // Assuming you're passing user ID in the request parameters

    // Find the user by ID and delete
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
});

// Get All Users
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    // Fetch all users from the database
    const users = await User.find();

    res.status(200).json({ status: 'success', data: users });
});

