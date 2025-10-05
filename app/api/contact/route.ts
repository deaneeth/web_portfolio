import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    // Validation
    const errors: Record<string, string> = {};

    if (!name?.trim()) {
      errors.name = 'Name is required';
    }

    if (!email?.trim()) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!projectType) {
      errors.projectType = 'Please select a project type';
    }

    if (!message?.trim()) {
      errors.message = 'Project description is required';
    } else if (message.trim().length < 20) {
      errors.message = 'Please provide at least 20 characters';
    }

    // If validation fails, return errors
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Project type labels
    const projectTypeLabels: Record<string, string> = {
      'ai-ml': 'AI/ML Solution',
      'automation': 'Intelligent Automation',
      'web-app': 'Web Application',
      'consulting': 'Design & Consulting',
      'other': 'Other',
    };

    // Budget labels
    const budgetLabels: Record<string, string> = {
      'under-5k': 'Under $5,000',
      '5k-10k': '$5,000 - $10,000',
      '10k-25k': '$10,000 - $25,000',
      '25k-plus': '$25,000+',
      'discuss': "Let's discuss",
    };

    // Timeline labels
    const timelineLabels: Record<string, string> = {
      'asap': 'ASAP',
      '1-month': 'Within 1 month',
      '2-3-months': '2-3 months',
      'flexible': 'Flexible',
    };

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>', // Will change to your domain
      to: process.env.CONTACT_EMAIL || 'dinethnethusahan@gmail.com',
      replyTo: email,
      subject: `New Contact Form: ${projectTypeLabels[projectType] || projectType}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .container {
                background-color: #ffffff;
                border-radius: 12px;
                padding: 32px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                border-bottom: 3px solid #8b5cf6;
                padding-bottom: 20px;
                margin-bottom: 24px;
              }
              .header h1 {
                color: #8b5cf6;
                margin: 0;
                font-size: 24px;
                font-weight: 700;
              }
              .header p {
                color: #666;
                margin: 8px 0 0 0;
                font-size: 14px;
              }
              .section {
                margin-bottom: 24px;
              }
              .section-title {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                color: #8b5cf6;
                margin-bottom: 8px;
                letter-spacing: 0.5px;
              }
              .section-content {
                background-color: #f9fafb;
                padding: 16px;
                border-radius: 8px;
                border-left: 4px solid #8b5cf6;
              }
              .info-grid {
                display: grid;
                grid-template-columns: 120px 1fr;
                gap: 12px;
                margin-bottom: 12px;
              }
              .info-label {
                font-weight: 600;
                color: #666;
                font-size: 14px;
              }
              .info-value {
                color: #333;
                font-size: 14px;
              }
              .message-box {
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 20px;
                margin-top: 12px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 32px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #999;
                font-size: 13px;
              }
              .badge {
                display: inline-block;
                background-color: #8b5cf6;
                color: white;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: 600;
                margin-top: 4px;
              }
              .highlight {
                color: #8b5cf6;
                font-weight: 600;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 New Contact Form Submission</h1>
                <p>You have received a new inquiry from your portfolio website</p>
              </div>

              <div class="section">
                <div class="section-title">👤 Contact Information</div>
                <div class="section-content">
                  <div class="info-grid">
                    <div class="info-label">Name:</div>
                    <div class="info-value"><strong>${name}</strong></div>
                    
                    <div class="info-label">Email:</div>
                    <div class="info-value"><a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a></div>
                    
                    ${company ? `
                    <div class="info-label">Company:</div>
                    <div class="info-value">${company}</div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">📋 Project Details</div>
                <div class="section-content">
                  <div class="info-grid">
                    <div class="info-label">Project Type:</div>
                    <div class="info-value">
                      <span class="badge">${projectTypeLabels[projectType] || projectType}</span>
                    </div>
                    
                    ${budget ? `
                    <div class="info-label">Budget:</div>
                    <div class="info-value">${budgetLabels[budget] || budget}</div>
                    ` : ''}
                    
                    ${timeline ? `
                    <div class="info-label">Timeline:</div>
                    <div class="info-value">${timelineLabels[timeline] || timeline}</div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">💬 Message</div>
                <div class="section-content">
                  <div class="message-box">${message}</div>
                </div>
              </div>

              <div class="footer">
                <p>This email was sent from your portfolio contact form</p>
                <p style="margin-top: 8px;">
                  <strong>Reply directly to this email</strong> to respond to <span class="highlight">${name}</span>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      // Plain text fallback
      text: `
New Contact Form Submission

CONTACT INFORMATION
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

PROJECT DETAILS
Project Type: ${projectTypeLabels[projectType] || projectType}
${budget ? `Budget: ${budgetLabels[budget] || budget}` : ''}
${timeline ? `Timeline: ${timelineLabels[timeline] || timeline}` : ''}

MESSAGE
${message}

---
Reply to this email to respond to ${name} at ${email}
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
