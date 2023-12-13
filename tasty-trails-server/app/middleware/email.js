import nodemailer from 'nodemailer';

// Replace these values with your email and password
const emailUser = 'psvkyear2023@gmail.com';
const emailPass = 'jnyrosoktlbluqbf';
const emailText = "Welcome to Tasty Trails – your passport to a world of culinary delights!\n\nAt Tasty Trails, we're on a mission to bring people together through the joy of sharing food. Whether you're a seasoned chef or a passionate home cook, our platform is designed to inspire and connect you with a community of like-minded food enthusiasts.\n\nHere's what Tasty Trails has to offer:\n\nLeftovers Sharing: Reduce food waste by sharing your delicious leftovers with others in your community. Your culinary creations could be a delightful surprise for someone looking for a tasty treat\n\nExclusive Communities: Join specialized communities where members share exclusive posts.\n\nTasty Trails is more than an app; it's a vibrant community where food connects us all.\n\nWe're excited to have you as part of Tasty Trails. Your culinary adventure starts now, and we can't wait to see the delicious experiences you share with the community.";

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
    subject: 'Welcome to Tasty Trails - Let Your Culinary Adventures Begin!',
    text: emailText,
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




