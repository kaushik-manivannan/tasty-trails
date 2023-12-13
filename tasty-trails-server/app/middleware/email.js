import nodemailer from 'nodemailer';

// Replace these values with your email and password
const emailUser = 'psvkyear2023@gmail.com';
const emailPass = 'jnyrosoktlbluqbf';
const emailText = (userName) => `
Dear ${userName},

Greetings and welcome to Tasty Trails!

We are thrilled to have you as a part of our growing culinary community. At Tasty Trails, we believe that food is not just about sustenance; it's an adventure, a journey of flavors, and a celebration of cultures. We're excited that you've chosen to embark on this delicious journey with us.

Thank you for choosing Tasty Trails. We're honored to be a part of your culinary adventure. If you ever have questions, feedback, or simply want to share your kitchen triumphs, feel free to reach out to us. Happy cooking!

To delicious discoveries,
The Tasty Trails Team
`;
// Creating a nodemailer transporter using Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});


/**
 * Sends a welcome email to the specified email address.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} userName - The username of the recipient.
 * @returns {Promise<string>} A promise that resolves with the response from the email server.
 * @throws {Error} Throws an error if there is an issue sending the email.
 */
export const sendEmail = async (to, userName) => {
  const mailOptions = {
    from: emailUser,
    to,
    subject: 'Welcome to Tasty Trails - Let Your Culinary Adventures Begin!',
    text: emailText(userName),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.response;
  } catch (error) {
      throw error;
  }
}



