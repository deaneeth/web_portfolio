# Production Email Setup Guide

## 🎉 Current Status: Development Mode

Your service order form is currently working in **development/testing mode**. Both emails (client confirmation and seller notification) are being sent to your verified email address: `dinethnethusahan@gmail.com`.

---

## 🚀 Moving to Production (When You Have a Domain)

### Step 1: Purchase and Set Up Your Domain

When you purchase a domain (e.g., `deaneeth.com`, `yourbusiness.com`), you'll need to:

1. **Add Domain to Resend**
   - Go to [Resend Dashboard → Domains](https://resend.com/domains)
   - Click "Add Domain"
   - Enter your domain name (e.g., `deaneeth.com`)

2. **Configure DNS Records**
   
   Resend will provide you with DNS records to add to your domain registrar (GoDaddy, Namecheap, etc.):
   
   ```
   Type: TXT
   Name: resend._domainkey
   Value: [provided by Resend]
   
   Type: MX
   Name: @
   Value: feedback-smtp.us-east-1.amazonses.com
   Priority: 10
   ```

3. **Wait for Verification** (usually 24-48 hours)
   - Resend will automatically verify your domain
   - You'll receive a confirmation email when ready

---

### Step 2: Set Up Your Business Email

Once your domain is verified, you can create professional sender addresses:

#### **Option A: Using Your Domain Only (No Business Email Service)**

You can send FROM addresses like:
- `noreply@deaneeth.com` (for automated emails)
- `orders@deaneeth.com` (for order confirmations)
- `hello@deaneeth.com` (for general contact)
- `support@deaneeth.com` (for customer support)

**Note:** These are "send-only" addresses. You won't receive replies to them unless you also set up email hosting.

#### **Option B: With Business Email Service (Recommended)**

Purchase a business email plan from:
- **Google Workspace** ($6/month) → `yourname@deaneeth.com`
- **Microsoft 365** ($6/month) → `yourname@deaneeth.com`
- **Zoho Mail** (Free for 1 user) → `yourname@deaneeth.com`
- **Your Domain Registrar** (often included)

Example professional emails:
- `dineth@deaneeth.com` (your main business email)
- `contact@deaneeth.com` (general inquiries)
- `orders@deaneeth.com` (order notifications)

---

### Step 3: Update Your Code

Open `app/api/send-order/route.ts` and make these changes:

#### **Change 1: Update Client Confirmation Email**

**Current (Development):**
```typescript
const clientEmail = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'dinethnethusahan@gmail.com', // Testing mode
  subject: `Order Confirmation - ${service}`,
  html: getClientEmailTemplate(emailData),
});
```

**Production (With Your Domain):**
```typescript
const clientEmail = await resend.emails.send({
  from: 'Deaneeth Husahan <noreply@deaneeth.com>', // Your domain
  to: email, // ← IMPORTANT: Send to actual client's email
  subject: `Order Confirmation - ${service}`,
  html: getClientEmailTemplate(emailData),
});
```

#### **Change 2: Update Seller Notification Email**

**Current (Development):**
```typescript
const sellerEmail = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'dinethnethusahan@gmail.com', // Testing mode
  subject: `🎉 New Order: ${service} from ${name}`,
  html: getSellerEmailTemplate(emailData),
  attachments: attachments.length > 0 ? attachments : undefined,
  replyTo: email,
});
```

**Production (With Your Domain):**
```typescript
const sellerEmail = await resend.emails.send({
  from: 'Portfolio Orders <orders@deaneeth.com>', // Your domain
  to: 'dineth@deaneeth.com', // Your business email (where you want to receive orders)
  subject: `🎉 New Order: ${service} from ${name}`,
  html: getSellerEmailTemplate(emailData),
  attachments: attachments.length > 0 ? attachments : undefined,
  replyTo: email, // Client can reply directly to you
});
```

---

### Step 4: Real-World Example Configuration

Let's say you bought the domain **`deaneethcreative.com`** and set up a Google Workspace account:

**Your Business Email:** `dineth@deaneethcreative.com`

**Updated Code:**
```typescript
// Send confirmation to CLIENT
const clientEmail = await resend.emails.send({
  from: 'Deaneeth Creative <noreply@deaneethcreative.com>',
  to: email, // Client's actual email address
  subject: `Order Confirmation - ${service}`,
  html: getClientEmailTemplate(emailData),
});

// Send notification to YOU (the seller)
const sellerEmail = await resend.emails.send({
  from: 'Order System <orders@deaneethcreative.com>',
  to: 'dineth@deaneethcreative.com', // Your business email
  subject: `🎉 New Order: ${service} from ${name}`,
  html: getSellerEmailTemplate(emailData),
  attachments: attachments.length > 0 ? attachments : undefined,
  replyTo: email, // When you hit "Reply", it goes to the client
});
```

**Email Flow:**
1. Client fills form on your website
2. Client receives confirmation from `noreply@deaneethcreative.com`
3. You receive order notification at `dineth@deaneethcreative.com` with all details + files
4. You can reply directly to the client (their email is in `replyTo`)

---

## 📊 Resend Free Plan Limitations

### **Free Tier Includes:**

| Feature | Free Plan Limit |
|---------|----------------|
| **Emails per month** | 3,000 emails |
| **Emails per day** | 100 emails |
| **Sender addresses** | Unlimited (with verified domains) |
| **API calls** | Unlimited |
| **File attachments** | ✅ Yes (up to 40MB total per email) |
| **Custom domains** | ✅ 1 domain |
| **Email tracking** | ✅ Opens & clicks |
| **Webhooks** | ✅ Delivery & bounce events |
| **Support** | Community support |
| **Team members** | 1 user |

### **What This Means for Your Portfolio:**

✅ **You're covered!** With 3,000 emails/month:
- ~100 client confirmations + 100 seller notifications = 200 emails per month
- That's 50 orders per month comfortably covered
- Even with follow-up emails, you're well within limits

### **When You Need to Upgrade:**

If you exceed these limits, Resend offers:

**Pro Plan ($20/month):**
- 50,000 emails/month
- Unlimited domains
- 99.9% uptime SLA
- Priority support
- Up to 5 team members
- Advanced analytics

**Business Plan ($80/month):**
- 500,000 emails/month
- Dedicated IP address
- Phone support
- Custom DKIM/SPF setup

---

## 🔧 Quick Reference: Files to Change

When moving to production, you only need to change **ONE file**:

### `app/api/send-order/route.ts`

**Lines to update:**
- Line ~213: Client email `from` address
- Line ~214: Client email `to` address (change from your email to `email`)
- Line ~221: Seller email `from` address  
- Line ~222: Seller email `to` address (your business email)

**Example diff:**
```diff
  const clientEmail = await resend.emails.send({
-   from: 'onboarding@resend.dev',
+   from: 'Deaneeth <noreply@yourdomain.com>',
-   to: 'dinethnethusahan@gmail.com',
+   to: email,
    subject: `Order Confirmation - ${service}`,
    html: getClientEmailTemplate(emailData),
  });

  const sellerEmail = await resend.emails.send({
-   from: 'onboarding@resend.dev',
+   from: 'Orders <orders@yourdomain.com>',
-   to: 'dinethnethusahan@gmail.com',
+   to: 'yourbusiness@yourdomain.com',
    subject: `🎉 New Order: ${service} from ${name}`,
    html: getSellerEmailTemplate(emailData),
    attachments: attachments.length > 0 ? attachments : undefined,
    replyTo: email,
  });
```

---

## ✅ Pre-Launch Checklist

Before switching to production mode:

- [ ] Domain purchased and DNS configured
- [ ] Domain verified in Resend (green checkmark)
- [ ] Business email set up (optional but recommended)
- [ ] Updated `from` addresses in `route.ts` to use your domain
- [ ] Changed client `to` from your email to `email` variable
- [ ] Updated seller notification `to` to your business email
- [ ] Tested sending an order
- [ ] Verified client receives confirmation
- [ ] Verified you receive notification with attachments
- [ ] Checked spam folders to ensure delivery
- [ ] Set up SPF and DKIM records (done automatically by Resend)

---

## 🆘 Troubleshooting Production Issues

### "Emails not being delivered"
- Check your domain verification status in Resend
- Verify DNS records are correctly set up
- Check spam/junk folders
- Review Resend logs in dashboard

### "Client doesn't receive confirmation"
- Make sure you changed `to: email` (not `to: 'your-email@gmail.com'`)
- Check if client's email is valid
- Look in Resend dashboard for bounce/failure logs

### "Attachments not working"
- Ensure total file size < 40MB (you have 10MB limit in form)
- Check file types are allowed
- Review terminal logs for errors

### "Rate limit exceeded"
- You've hit 100 emails/day or 3,000/month
- Wait for reset or upgrade to Pro plan
- Check for accidental loops sending multiple emails

---

## 📝 Example Email Addresses by Industry

Choose professional sender addresses based on your business:

**Creative Agency:**
- `hello@deaneethcreative.com`
- `projects@deaneethcreative.com`
- `noreply@deaneethcreative.com`

**Freelancer:**
- `dineth@deaneeth.com`
- `hi@deaneeth.com`
- `work@deaneeth.com`

**Studio:**
- `studio@yourstudio.com`
- `bookings@yourstudio.com`
- `info@yourstudio.com`

**Professional Services:**
- `contact@yourname.com`
- `admin@yourname.com`
- `quotes@yourname.com`

---

## 🎯 Recommended Setup (Best Practice)

**For your portfolio website, I recommend:**

1. **Sender Addresses:**
   - Client confirmations: `noreply@yourdomain.com` or `hello@yourdomain.com`
   - Seller notifications: `orders@yourdomain.com`

2. **Recipient Addresses:**
   - Clients: Their actual email (variable `email`)
   - You: Your business email (e.g., `dineth@yourdomain.com`)

3. **Reply Behavior:**
   - Keep `replyTo: email` in seller notification
   - This lets you hit "Reply" to respond directly to clients

**Why this works:**
- Professional appearance for clients
- Clear organization (you know "orders@" emails are new orders)
- Easy to reply to clients
- Can be filtered into folders in your inbox

---

## 📞 Support Resources

- **Resend Documentation:** https://resend.com/docs
- **Resend Status:** https://status.resend.com
- **Community Support:** https://resend.com/discord
- **DNS Setup Guide:** https://resend.com/docs/dashboard/domains/introduction

---

## 🎉 You're All Set!

Once you have your domain and make these simple changes, your service order form will be production-ready! The current implementation is solid and only requires updating email addresses to go live.

**Current Status:** ✅ Fully functional in development mode  
**Next Step:** Purchase domain → Verify with Resend → Update 4 lines of code → Production ready!

---

*Last Updated: October 5, 2025*
