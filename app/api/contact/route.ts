import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message }: ContactFormData = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Email content for you (recipient)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'm.shoaibisrar129@gmail.com', // Your email where you want to receive messages
      subject: `Message from portfolio: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0077b6 0%, #005577 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Portfolio Contact Message</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">From Muhammad Shoaib Israr's Portfolio</p>
          </div>

          <div style="padding: 30px; background: #f8fafc; border-left: 4px solid #0077b6;">
            <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 20px;">Contact Details</h2>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
              <p style="margin: 0 0 8px; color: #64748b; font-size: 14px; font-weight: bold;">NAME</p>
              <p style="margin: 0 0 15px; color: #1e293b; font-size: 16px;">${name}</p>

              <p style="margin: 0 0 8px; color: #64748b; font-size: 14px; font-weight: bold;">EMAIL</p>
              <p style="margin: 0 0 15px; color: #0077b6; font-size: 16px;">${email}</p>

              <p style="margin: 0 0 8px; color: #64748b; font-size: 14px; font-weight: bold;">MESSAGE</p>
              <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.6; padding: 15px; background: #f1f5f9; border-radius: 6px;">${message}</p>
            </div>
          </div>

          <div style="padding: 20px; background: #1e293b; text-align: center;">
            <p style="margin: 0; color: #94a3b8; font-size: 14px;">
              This message was sent from your portfolio contact form<br>
              <span style="color: #0077b6;">Muhammad Shoaib Israr - Executive Accounts</span>
            </p>
          </div>
        </div>
      `,
    };

    // Auto-reply email to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Muhammad Shoaib Israr',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0077b6 0%, #005577 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Your Message!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Muhammad Shoaib Israr - Executive Accounts</p>
          </div>

          <div style="padding: 30px;">
            <h2 style="color: #1e293b; margin: 0 0 20px;">Hello ${name},</h2>

            <p style="color: #64748b; line-height: 1.6; font-size: 16px; margin: 0 0 20px;">
              Thank you for reaching out through my portfolio website. I have received your message and appreciate your interest.
            </p>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0077b6; margin: 20px 0;">
              <h3 style="color: #1e293b; margin: 0 0 15px; font-size: 18px;">Your Message:</h3>
              <p style="color: #64748b; font-style: italic; margin: 0; line-height: 1.6;">"${message}"</p>
            </div>

            <p style="color: #64748b; line-height: 1.6; font-size: 16px; margin: 20px 0;">
              I will review your message and get back to you as soon as possible. In the meantime, feel free to connect with me on LinkedIn or reach out via phone for any urgent matters.
            </p>

            <div style="background: #0077b6; color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px;">Contact Information:</h3>
              <p style="margin: 5px 0; opacity: 0.9;">📧 m.shoaibisrar129@gmail.com</p>
              <p style="margin: 5px 0; opacity: 0.9;">📱 0307-4974578</p>
              <p style="margin: 5px 0; opacity: 0.9;">📍 Lahore, Pakistan</p>
            </div>

            <p style="color: #64748b; line-height: 1.6; font-size: 16px; margin: 20px 0 0;">
              Best regards,<br>
              <strong style="color: #1e293b;">Muhammad Shoaib Israr</strong><br>
              <span style="color: #0077b6; font-weight: 600;">Executive Accounts Professional</span>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully! You will receive a confirmation email shortly.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again or contact directly via phone/email.'
      },
      { status: 500 }
    );
  }
}