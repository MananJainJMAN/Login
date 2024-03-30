const forgotemailTemplate = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h2 {
                color: #333333;
            }
            p {
                color: #666666;
            }
            .reset-link {
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 3px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Password Reset Request</h2>
            <p>We have received a password reset request for your account. Please use the following link to reset your password:</p>
            <a class="reset-link" href="{{resetURL}}">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email.</p>
        </div>
    </body>
    </html>
`;

module.exports = forgotemailTemplate