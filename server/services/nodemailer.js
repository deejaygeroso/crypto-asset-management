const nodemailer = require('nodemailer');


module.exports = {
    emailVerification: (email, verificationCode) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'deejaygeroso@gmail.com',
                    pass: 'bv4sp83z',
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"blockpsv.com" deejaygeroso@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Email Verification', // Subject line
                text: 'Hello world?', // plain text body
                html: `<div id="" class="">-----BEGIN PGP SIGNED MESSAGE-----<br> Hash: SHA256<br><br> Hello,<br> <br> This email contains your 2 Factor Authentication code to verify your email at blockpsv.com.<br> <br> Email: ${email}<br>Code: ${verificationCode}<br> This code is case sensitive!<br> Thank you,<br> blockpsv.com<br> Support is available at: <a href="https://www.blockpsv.com" rel="noreferrer" target="_blank">https://www.blockpsv.com </a> <br> <br> <br> -----BEGIN PGP SIGNATURE-----<br> <br> </div>`,
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
}