import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Mark route as dynamic to handle FormData
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
function getClientEmailTemplate(data: {
  name: string;
  service: string;
  requirements: string;
  deadline: string;
  budget: string;
  paymentMethod: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea; }
    .label { font-weight: 600; color: #667eea; margin-bottom: 5px; }
    .value { color: #4b5563; margin-bottom: 15px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
    .checkmark { display: inline-block; width: 60px; height: 60px; background: #10b981; border-radius: 50%; margin-bottom: 20px; }
    .checkmark::after { content: "✓"; color: white; font-size: 40px; line-height: 60px; display: block; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="checkmark"></div>
      <h1>Order Received Successfully!</h1>
    </div>
    <div class="content">
      <p>Hi ${data.name},</p>
      
      <p>Thank you for your order request! I've received your project details and will review them carefully.</p>
      
      <div class="card">
        <div class="label">Service Requested:</div>
        <div class="value">${data.service}</div>
        
        <div class="label">Project Requirements:</div>
        <div class="value">${data.requirements}</div>
        
        ${data.deadline !== 'Not specified' ? `
        <div class="label">Deadline:</div>
        <div class="value">${data.deadline}</div>
        ` : ''}
        
        ${data.budget !== 'Not specified' ? `
        <div class="label">Budget:</div>
        <div class="value">${data.budget}</div>
        ` : ''}
        
        ${data.paymentMethod !== 'To be discussed' ? `
        <div class="label">Preferred Payment Method:</div>
        <div class="value">${data.paymentMethod}</div>
        ` : ''}
      </div>
      
      <p><strong>What happens next?</strong></p>
      <ul style="color: #4b5563;">
        <li>I'll review your requirements within 24 hours</li>
        <li>You'll receive a detailed proposal with timeline and pricing</li>
        <li>We'll schedule a call to discuss the project in detail</li>
      </ul>
      
      <p>If you have any questions in the meantime, feel free to reply to this email.</p>
      
      <p>Best regards,<br><strong>Deaneeth Husahan</strong></p>
      
      <div class="footer">
        <p>This is an automated confirmation email. Please do not reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

function getSellerEmailTemplate(data: {
  name: string;
  email: string;
  service: string;
  requirements: string;
  deadline: string;
  budget: string;
  paymentMethod: string;
  fileCount: number;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b; }
    .label { font-weight: 600; color: #f59e0b; margin-bottom: 5px; font-size: 14px; }
    .value { color: #1f2937; margin-bottom: 15px; }
    .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b; margin: 20px 0; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 New Service Order Received!</h1>
    </div>
    <div class="content">
      <div class="highlight">
        <strong>📧 New order from: ${data.name}</strong><br>
        <span style="color: #6b7280;">Reply to: ${data.email}</span>
      </div>
      
      <div class="card">
        <div class="label">SERVICE REQUESTED</div>
        <div class="value"><strong style="font-size: 18px;">${data.service}</strong></div>
        
        <div class="label">CLIENT DETAILS</div>
        <div class="value">
          <strong>Name:</strong> ${data.name}<br>
          <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
        </div>
        
        <div class="label">PROJECT REQUIREMENTS</div>
        <div class="value" style="white-space: pre-wrap; background: #f3f4f6; padding: 15px; border-radius: 6px;">
${data.requirements}
        </div>
        
        <div class="label">PROJECT DETAILS</div>
        <div class="value">
          <strong>Deadline:</strong> ${data.deadline}<br>
          <strong>Budget:</strong> ${data.budget}<br>
          <strong>Payment Method:</strong> ${data.paymentMethod}
        </div>
        
        ${data.fileCount > 0 ? `
        <div class="label">ATTACHMENTS</div>
        <div class="value">
          <span class="badge">${data.fileCount} file${data.fileCount > 1 ? 's' : ''} attached</span>
        </div>
        ` : ''}
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #6b7280; font-size: 14px;">⏰ Received at ${new Date().toLocaleString()}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const requirements = formData.get('requirements') as string;
    const deadline = formData.get('deadline') as string;
    const budget = formData.get('budget') as string;
    const paymentMethod = formData.get('paymentMethod') as string;
    const service = formData.get('service') as string;
    
    // Extract files
    const files = formData.getAll('files') as File[];
    
    // Convert files to attachments format for Resend
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        return {
          filename: file.name,
          content: buffer,
        };
      })
    );

    const emailData = {
      name,
      email,
      service,
      requirements,
      deadline,
      budget,
      paymentMethod,
      fileCount: files.length,
    };

    // Send confirmation email to client
    const clientEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'dinethnethusahan@gmail.com', // Changed to your verified email
      subject: `Order Confirmation - ${service}`,
      html: getClientEmailTemplate(emailData),
    });

    console.log('Client email result:', clientEmail);

    // Send notification email to seller with attachments
    const sellerEmail = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'dinethnethusahan@gmail.com', // Changed to your verified email
      subject: `🎉 New Order: ${service} from ${name}`,
      html: getSellerEmailTemplate(emailData),
      attachments: attachments.length > 0 ? attachments : undefined,
      replyTo: email, // Allow direct reply to client
    });

    console.log('Seller email result:', sellerEmail);

    if (clientEmail.error || sellerEmail.error) {
      console.error('Client email error:', clientEmail.error);
      console.error('Seller email error:', sellerEmail.error);
      throw new Error('Failed to send emails');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Order submitted successfully',
        clientEmailId: clientEmail.data?.id,
        sellerEmailId: sellerEmail.data?.id,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process order. Please try again.' 
      },
      { status: 500 }
    );
  }
}
