# 📬 Contact Form - Business Email Migration Guide

## Overview

Your portfolio contact form is **fully functional** and ready to receive messages. This guide explains what you need to update when you get your business email.

---

## 🎯 Current Setup (Working Now)

✅ **Contact form sends emails to**: `dinethnethusahan@gmail.com`  
✅ **Emails come from**: `onboarding@resend.dev` (Resend's free tier)  
✅ **Features working**:
- Form validation (name, email, message requirements)
- Professional HTML email formatting
- Success popup with auto-close
- Error handling and user feedback
- Direct reply-to functionality

---

## 🏢 When You Get Your Business Email

Once you purchase a custom domain and set up a business email (e.g., `contact@yourdomain.com`), you'll need to make **2 simple updates**:

### Update 1: Verify Your Domain with Resend

**Why?** To send emails from your own domain instead of `onboarding@resend.dev`

**Steps**:
1. Log in to Resend dashboard: https://resend.com/domains
2. Click **"Add Domain"** and enter your domain (e.g., `yourdomain.com`)
3. Add the provided DNS records to your domain provider:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **DMARC Record** (TXT)
4. Wait 24-48 hours for verification

**Where to add DNS records** (common providers):
- **Namecheap**: Domain List → Manage → Advanced DNS → Add Record
- **GoDaddy**: DNS Management → Add Record
- **Cloudflare**: DNS → Records → Add Record
- **Google Domains**: DNS → Custom Records → Manage

### Update 2: Change 2 Lines of Code

**File**: `app/api/contact/route.ts`

**Line ~75** - Update the "from" email:

```typescript
// BEFORE (current - using Resend's free email):
from: 'Portfolio Contact Form <onboarding@resend.dev>',

// AFTER (your custom domain):
from: 'Portfolio Contact Form <noreply@yourdomain.com>',
```

**Examples**:
```typescript
// Option 1: No-reply address (recommended)
from: 'Dineth Portfolio <noreply@yourdomain.com>',

// Option 2: Contact address
from: 'Dineth Nethusahan <contact@yourdomain.com>',

// Option 3: Info address
from: 'Portfolio Contact <info@yourdomain.com>',
```

**File**: `.env.local` (or production environment variables)

Update where you receive emails:
```env
# BEFORE (current):
CONTACT_EMAIL=dinethnethusahan@gmail.com

# AFTER (your business email):
CONTACT_EMAIL=contact@yourdomain.com
```

---

## 📋 Complete Migration Checklist

When you're ready to switch to your business email:

### Pre-Migration
- [ ] Purchase your custom domain
- [ ] Set up email hosting (Gmail Workspace, Outlook, etc.)
- [ ] Verify you can receive emails at your business address

### Resend Configuration
- [ ] Log in to Resend dashboard
- [ ] Add your custom domain
- [ ] Copy the DNS records (SPF, DKIM, DMARC)
- [ ] Add DNS records to your domain provider
- [ ] Wait for domain verification (24-48 hours)
- [ ] Confirm verification status shows "Verified"

### Code Updates
- [ ] Update `from` address in `app/api/contact/route.ts`
- [ ] Update `CONTACT_EMAIL` in `.env.local`
- [ ] Test locally by submitting the contact form
- [ ] Confirm you receive the test email

### Production Deployment
- [ ] Update environment variables in your hosting platform:
  - Vercel: Settings → Environment Variables
  - Netlify: Site Settings → Environment Variables
  - Other: Add `RESEND_API_KEY` and `CONTACT_EMAIL`
- [ ] Deploy your updated code
- [ ] Test on live website
- [ ] Verify emails arrive at business address

---

## 🎨 Email Preview (What You'll Receive)

```
📬 New Contact Form Submission

CONTACT INFORMATION
Name:           John Smith
Email:          john@example.com
Company:        Tech Startup Inc.

PROJECT DETAILS
Project Type:   [AI/ML Solution]
Budget:         $10,000 - $25,000
Timeline:       2-3 months

MESSAGE
I'm interested in building an AI-powered recommendation system...

---
Reply directly to this email to respond to John Smith
```

- **Professional HTML formatting** with your brand colors
- **Mobile-responsive** design
- **All form fields** included (name, email, company, project type, budget, timeline, message)
- **Reply-to** automatically set to sender's email

---

## ⚙️ Environment Variables Reference

### Development (`.env.local`)
```env
# Required: Your Resend API Key
RESEND_API_KEY=re_your_api_key_here

# Required: Where contact form emails are sent
CONTACT_EMAIL=dinethnethusahan@gmail.com
```

### Production (Vercel/Netlify/etc.)
Add the same variables to your hosting platform's environment settings.

**Important**: 
- Never commit `.env.local` to Git (already in `.gitignore`)
- Use different API keys for development and production (optional but recommended)

---

## 🔒 Security & Best Practices

✅ **Environment variables** are secure and not exposed to clients  
✅ **Form validation** happens on both client and server  
✅ **Email credentials** are never exposed in frontend code  
✅ **Reply-to** is set to sender's email for easy responses  
✅ **Error handling** prevents sensitive information leaks  

**Optional Enhancements**:
- Add rate limiting to prevent spam
- Implement CAPTCHA for additional security
- Set up email notifications for you

---

## 💰 Cost Breakdown

### Current Setup (Free)
- **Resend Free Tier**: 3,000 emails/month
- **Cost**: $0/month
- **Limitation**: Emails sent from `onboarding@resend.dev`

### With Business Email
- **Resend Pro**: $20/month for 50,000 emails
- **Business Email**: $6-12/month (Gmail Workspace, Outlook 365)
- **Total**: ~$26-32/month
- **Benefits**: 
  - Send from your custom domain
  - Professional appearance
  - Better deliverability
  - More email volume

**Recommendation**: Stay on free tier until you get regular traffic, then upgrade when you have a custom domain.

---

## 📞 Support & Resources

### Quick Help
- **Setup Issues**: See `QUICK_START.md` for 5-minute setup
- **Detailed Guide**: See `CONTACT_FORM_SETUP.md` for comprehensive instructions
- **Resend Docs**: https://resend.com/docs

### Common Questions

**Q: Can I use my Gmail address for the "from" field?**  
A: No, you need to verify a custom domain. Use `onboarding@resend.dev` (free tier) or your verified domain.

**Q: Will emails go to spam?**  
A: With proper DNS records (SPF, DKIM, DMARC) and verified domain, deliverability is excellent.

**Q: Can I change the email template design?**  
A: Yes! Edit the HTML in `app/api/contact/route.ts` starting at line ~85.

**Q: What if I want to use a different email service?**  
A: You can switch to SendGrid, Postmark, or AWS SES. See `CONTACT_FORM_SETUP.md` for alternatives.

---

## ✅ Summary

### What Works Now (No Action Needed)
✅ Contact form fully functional  
✅ Emails sent to `dinethnethusahan@gmail.com`  
✅ Professional formatting  
✅ Form validation  
✅ Success/error handling  
✅ Auto-close popup  

### What to Update Later (When You Get Business Email)
1. Verify your custom domain with Resend
2. Change 1 line in `route.ts` (the "from" email)
3. Update `CONTACT_EMAIL` environment variable
4. Deploy and test

**Estimated Time**: 15 minutes of work + 24-48 hours DNS verification

---

**Last Updated**: October 2025  
**Contact Form Version**: 1.0.0

For the complete step-by-step guide, see **`CONTACT_FORM_SETUP.md`** 📚
