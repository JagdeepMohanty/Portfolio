import { sendEmail } from '../config/mailer.js';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeInput = (input) => {
  return input.trim().slice(0, 500);
};

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedMessage = sanitizeInput(message);

    // Create HTML email template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #EAB308;">New Contact Form Submission</h2>
        <hr style="border: 1px solid #EAB308;">
        
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        
        <h3 style="color: #EAB308; margin-top: 20px;">Message:</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${sanitizedMessage}</p>
        
        <hr style="border: 1px solid #EAB308; margin-top: 30px;">
        <p style="color: #999; font-size: 12px;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    `;

    // Send email
    await sendEmail(
      process.env.GMAIL_USER,
      `New Contact: ${sanitizedName}`,
      htmlContent
    );

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.'
    });
  }
};
