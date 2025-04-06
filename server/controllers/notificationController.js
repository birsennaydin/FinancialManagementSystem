const nodemailer = require('nodemailer');

exports.sendReminder = async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"SmartSpend App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text: message,
    });

    res.status(200).json({ success: true, message: 'Reminder sent successfully.' });
  } catch (error) {
    console.error('Mail sending error:', error.message);
    res.status(500).json({ error: 'Failed to send reminder.' });
  }
};
