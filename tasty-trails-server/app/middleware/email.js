import nodemailer from 'nodemailer';

// Replace these values with your email and password
const emailUser = 'psvkyear2023@gmail.com';
const emailPass = 'jnyrosoktlbluqbf';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const sendEmail = async (to) => {
  const mailOptions = {
    from: emailUser,
    to,
    subject: 'Welcome to Tasty Trials',
    text: 'You have sussessfully signed up to Tasty Trials',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return info.response;
  } catch (error) {
    console.error('Error sending email: ', error.toString());
    throw error;
  }
}




