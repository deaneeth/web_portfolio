import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

// Validation schema
const quotationSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  selectedOptions: z.array(z.string()).min(1, 'At least one option must be selected'),
  timeline: z.string().min(1, 'Timeline is required'),
  budget: z.string().min(1, 'Budget range is required'),
  projectBrief: z.string().min(20, 'Project brief must be at least 20 characters'),
  clientName: z.string().min(1, 'Name is required'),
  clientEmail: z.string().email('Valid email is required'),
  clientPhone: z.string().optional(),
  clientCompany: z.string().optional(),
  preferredContact: z.string().min(1, 'Preferred contact method is required'),
  consent: z.boolean().refine(val => val === true, 'Consent is required'),
  honeypot: z.string().max(0, 'Spam detected') // Anti-spam honeypot
});

// Generate ticket ID
function generateTicketId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `QT-${timestamp}-${random}`.toUpperCase();
}

// Email transporter setup
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = quotationSchema.parse(body);
    
    // Generate ticket ID
    const ticketId = generateTicketId();
    
    // Prepare data for database
    const quotationData = {
      service: validatedData.service,
      selected_options: validatedData.selectedOptions,
      timeline: validatedData.timeline,
      budget: validatedData.budget,
      project_brief: validatedData.projectBrief,
      client_name: validatedData.clientName,
      client_email: validatedData.clientEmail,
      client_phone: validatedData.clientPhone || null,
      client_company: validatedData.clientCompany || null,
      preferred_contact: validatedData.preferredContact,
      consent: validatedData.consent,
      ticket_id: ticketId,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from('quotation_requests')
      .insert([quotationData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to save quotation request');
    }

    // Send emails
    const transporter = createTransporter();

    // Email to owner
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7D27F5;">New Quotation Request — ${validatedData.service}</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Client Information</h3>
          <p><strong>Name:</strong> ${validatedData.clientName}</p>
          <p><strong>Email:</strong> ${validatedData.clientEmail}</p>
          ${validatedData.clientPhone ? `<p><strong>Phone:</strong> ${validatedData.clientPhone}</p>` : ''}
          ${validatedData.clientCompany ? `<p><strong>Company:</strong> ${validatedData.clientCompany}</p>` : ''}
          <p><strong>Preferred Contact:</strong> ${validatedData.preferredContact}</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Project Details</h3>
          <p><strong>Service:</strong> ${validatedData.service}</p>
          <p><strong>Selected Options:</strong></p>
          <ul>
            ${validatedData.selectedOptions.map(option => `<li>${option}</li>`).join('')}
          </ul>
          <p><strong>Timeline:</strong> ${validatedData.timeline}</p>
          <p><strong>Budget:</strong> ${validatedData.budget}</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Project Brief</h3>
          <p style="white-space: pre-wrap;">${validatedData.projectBrief}</p>
        </div>

        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Email to client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7D27F5;">Thanks for your request — ${validatedData.service}</h2>
        
        <p>Hi ${validatedData.clientName},</p>
        
        <p>Thank you for your interest in my ${validatedData.service.toLowerCase()} service! I've received your quotation request and will review it carefully.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Request Summary</h3>
          <p><strong>Service:</strong> ${validatedData.service}</p>
          <p><strong>Timeline:</strong> ${validatedData.timeline}</p>
          <p><strong>Budget Range:</strong> ${validatedData.budget}</p>
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
        </div>

        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4>What happens next?</h4>
          <ul>
            <li>I'll review your requirements within 24-48 hours</li>
            <li>You'll receive a detailed proposal with timeline and pricing</li>
            <li>We can schedule a call to discuss any questions</li>
          </ul>
        </div>

        <p>If you have any urgent questions, feel free to reach out:</p>
        <ul>
          <li>Email: hello@deaneeth.dev</li>
          <li>WhatsApp: +94 77 123 4567</li>
          <li>LinkedIn: linkedin.com/in/deaneeth</li>
        </ul>

        <p>Looking forward to working together!</p>
        
        <p>Best regards,<br>
        <strong>Deaneeth</strong><br>
        AI/ML Explorer & Creative Technologist</p>
      </div>
    `;

    // Send owner email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@deaneeth.dev',
      to: process.env.OWNER_EMAIL || 'hello@deaneeth.dev',
      subject: `New Quotation Request — ${validatedData.service} — ${validatedData.clientName}`,
      html: ownerEmailHtml,
    });

    // Send client confirmation email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@deaneeth.dev',
      to: validatedData.clientEmail,
      subject: `Thanks for your request — ${validatedData.service}`,
      html: clientEmailHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Quotation request submitted successfully',
      ticketId: ticketId
    });

  } catch (error) {
    console.error('Quote API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}