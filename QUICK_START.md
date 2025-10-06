# ⚡ Quick Start: Contact Form Email Setup

Get your contact form working in 5 minutes!

---

## 📝 Step 1: Sign Up for Resend (Free)

1. Go to **https://resend.com** and sign up
2. Verify your email address
3. Go to **API Keys** section
4. Click **"Create API Key"**
5. Copy the key (starts with `re_`)

---

## 🔧 Step 2: Add Environment Variables

1. **Create a new file** named `.env.local` in your project root

2. **Add these lines**:
   ```env
   RESEND_API_KEY=re_paste_your_key_here
   CONTACT_EMAIL=dinethnethusahan@gmail.com
   ```

3. **Save the file**

---

## 🚀 Step 3: Restart Your Server

```bash
# Stop your dev server (Ctrl+C)
# Then restart it:
npm run dev
```

---

## ✅ Step 4: Test It!

1. Go to `http://localhost:3000/contact`
2. Fill out the form
3. Click "Send Message"
4. Check your email inbox!

---

## 📧 What Happens Now?

- ✅ Form submissions are sent to your email
- ✅ You get a beautifully formatted email with all details
- ✅ You can reply directly to the sender
- ✅ Success popup shows automatically
- ✅ Form validation works perfectly

---

## 🏢 Want to Use Your Business Email?

Once you get a custom domain (e.g., `contact@yourdomain.com`):

1. Read the full guide: **`CONTACT_FORM_SETUP.md`**
2. Follow the "Business Email Migration" section
3. Takes about 15 minutes + DNS verification time

---

## ❓ Need Help?

**Common Issues**:

- **"Failed to send email"** → Check if `RESEND_API_KEY` is set correctly in `.env.local`
- **"Server restarted but not working"** → Make sure you saved `.env.local` file
- **"Email not arriving"** → Check spam folder, verify API key is valid

**Full Documentation**: See `CONTACT_FORM_SETUP.md` for detailed troubleshooting

---

That's it! Your contact form is now fully functional! 🎉
