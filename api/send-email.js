const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { email, subject, message } = req.body;
        if (!email || !message) {
            return res.status(400).json({ success: false, error: 'Email and message are required.' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shubhamxa7557@gmail.com',
                pass: 'enry cdxn ekjk ggce'
            }
        });

        const mailOptions = {
            from: 'shubhamxa7557@gmail.com',
            to: 'shubhamxa7557@gmail.com',
            replyTo: email,
            subject: `[Portfolio Contact] ${subject || 'New Message'}`,
            text: `You received a new message from your portfolio contact form:\n\nSender Email: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Failed to send email:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};
