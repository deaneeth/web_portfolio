<div align="center">

# 🚀 Deaneeth's Portfolio

### *Builder of Futures. AI/ML Explorer.*

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Framer_Motion-11.0.0-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/Version-0.1.0-orange?style=flat-square" alt="Version"/>
  <img src="https://img.shields.io/badge/Maintained-Yes-brightgreen?style=flat-square" alt="Maintained"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-contact">Contact</a>
</p>

---

</div>

## 👋 Welcome!

A modern, fully responsive personal portfolio showcasing projects, achievements, services, and technical expertise in **AI/ML** and **Computer Science**. Built with cutting-edge web technologies to deliver a seamless, interactive user experience.

> *"Turning ideas into reality through code"* - A 20-year-old Computer Science undergraduate at University of Plymouth, Sri Lanka, specializing in artificial intelligence and intelligent automation.

---

## ✨ Features

<table>
  <tr>
    <td>🎨</td>
    <td><strong>Modern UI/UX Design</strong><br/>Beautiful, intuitive interface with smooth animations and transitions</td>
  </tr>
  <tr>
    <td>🌓</td>
    <td><strong>Dark/Light Theme</strong><br/>Seamless theme switching with next-themes</td>
  </tr>
  <tr>
    <td>📱</td>
    <td><strong>Fully Responsive</strong><br/>Optimized for mobile, tablet, and desktop devices</td>
  </tr>
  <tr>
    <td>⚡</td>
    <td><strong>Lightning Fast</strong><br/>Built on Next.js 13 with App Router for optimal performance</td>
  </tr>
  <tr>
    <td>🎭</td>
    <td><strong>Smooth Animations</strong><br/>Engaging micro-interactions powered by Framer Motion</td>
  </tr>
  <tr>
    <td>📊</td>
    <td><strong>Analytics Integration</strong><br/>Vercel Analytics and Speed Insights for performance monitoring</td>
  </tr>
  <tr>
    <td>📧</td>
    <td><strong>Contact Form</strong><br/>Functional email integration using Resend API</td>
  </tr>
  <tr>
    <td>🎯</td>
    <td><strong>Service Ordering</strong><br/>Interactive modal system for service inquiries</td>
  </tr>
  <tr>
    <td>🏆</td>
    <td><strong>Achievement Wall</strong><br/>Showcase certifications, awards, and milestones</td>
  </tr>
  <tr>
    <td>💼</td>
    <td><strong>Project Portfolio</strong><br/>Detailed case studies with live demos and GitHub links</td>
  </tr>
</table>

---

## 🛠️ Tech Stack

### **Core Framework**
```
Next.js 13.5.1 (App Router)
React 18.2.0
TypeScript 5.2.2
```

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Tailwind Animate** - Animation utilities
- **next-themes** - Dark mode support
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Conditional class management

### **Animations & Interactions**
- **Framer Motion** - Advanced animations and transitions
- **Lucide React** - Beautiful, consistent icons

### **Forms & Email**
- **Resend** - Email delivery API
- **React Email** - Email template rendering

### **Analytics & Monitoring**
- **Vercel Analytics** - Web analytics
- **Vercel Speed Insights** - Performance metrics

### **UI Components**
- **Radix UI** - Unstyled, accessible components
- **Sonner** - Beautiful toast notifications

---

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### **Installation**

1️⃣ **Clone the repository**
```bash
git clone https://github.com/deaneeth/web_portfolio.git
cd web_portfolio
```

2️⃣ **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3️⃣ **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
# Resend API (for contact form)
RESEND_API_KEY=your_resend_api_key_here
SENDER_EMAIL=your_sender_email@domain.com
RECIPIENT_EMAIL=your_recipient_email@domain.com

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

4️⃣ **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5️⃣ **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) 🎉

---

## 📦 Project Structure

```
web_portfolio/
├── 📂 app/                      # Next.js 13 App Router
│   ├── 📄 page.tsx             # Homepage
│   ├── 📄 layout.tsx           # Root layout
│   ├── 📂 about/               # About page
│   ├── 📂 work/                # Projects/Portfolio page
│   ├── 📂 achievements/        # Achievement wall
│   ├── 📂 services/            # Creative services
│   ├── 📂 articles/            # Blog/Articles
│   ├── 📂 contact/             # Contact page
│   ├── 📂 faq/                 # FAQ page
│   └── 📂 api/                 # API routes
│       ├── contact/            # Contact form API
│       └── send-order/         # Service order API
│
├── 📂 components/              # Reusable components
│   ├── 📂 ui/                  # UI primitives
│   ├── 📂 layout/              # Layout components
│   ├── 📂 sections/            # Page sections
│   ├── 📂 search/              # Search functionality
│   └── 📂 easter-egg/          # Fun interactive elements
│
├── 📂 data/                    # Modular data files
│   ├── 📂 about/               # About page data
│   ├── 📂 achievements/        # Achievements data
│   ├── 📂 articles/            # Articles/blog data
│   ├── 📂 featuredWork/        # Project portfolio data
│   ├── 📂 services/            # Services data
│   ├── 📂 global/              # Global data (FAQ, footer)
│   ├── 📂 homepage/            # Homepage data
│   ├── 📂 config/              # Configuration files
│   └── 📂 utils/               # Data utility functions
│
├── 📂 lib/                     # Utility functions
│   └── 📂 utils/               # Helper utilities
│
├── 📂 public/                  # Static assets
│   └── 📄 image.png            # Public images
│
├── 📄 package.json             # Dependencies
├── 📄 tsconfig.json            # TypeScript config
├── 📄 tailwind.config.ts       # Tailwind CSS config
├── 📄 next.config.js           # Next.js config
└── 📄 README.md                # You are here!
```

---

## 🏗️ Build & Deployment

### **Production Build**
```bash
npm run build
npm run start
```

### **Deploy to Vercel** *(Recommended)*

The easiest way to deploy this Next.js app:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/deaneeth/web_portfolio)

Or manually:
```bash
vercel --prod
```

### **Other Platforms**
- **Netlify**: Connect repository and deploy
- **Railway**: One-click deployment
- **Docker**: Build and run container

---

## 🎨 Key Pages

| Page | Description | Features |
|------|-------------|----------|
| **🏠 Home** | Landing page with introduction | Recent activity, quick stats, featured sections |
| **👤 About** | Personal story and background | Education, experience, skills, timeline |
| **💼 Work** | Project portfolio | Filterable projects, detailed modals, live demos |
| **🏆 Achievements** | Certifications & awards | Category filters, verification links |
| **🛠️ Services** | Creative services offering | Service cards, order modal, testimonials |
| **📝 Articles** | Blog and writings | Coming soon - article grid |
| **📞 Contact** | Get in touch | Contact form, social links, FAQ |

---

## 🎯 Core Features Breakdown

### **🎨 Theme System**
- Automatic dark/light mode detection
- Manual theme toggle
- Persistent theme preference
- Seamless transitions between themes

### **📊 Dynamic Data Management**
- Modular data structure in `/data` folder
- TypeScript interfaces for type safety
- Centralized data imports
- Easy content updates without touching components

### **🔍 Search & Filtering**
- Real-time search across projects and achievements
- Category-based filtering
- Smooth transitions and animations

### **📧 Contact Integration**
- Server-side email handling
- Form validation
- Success/error notifications
- Spam protection

### **🚀 Performance Optimizations**
- Next.js App Router for optimal routing
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Vercel Analytics for monitoring

---

## 📸 Screenshots

### 🌟 **Homepage**
*Beautiful landing page with dynamic activity feed*

### 💼 **Project Portfolio**
*Interactive project cards with hover effects and detailed modals*

### 🏆 **Achievement Wall**
*Organized showcase of certifications and awards*

### 🛠️ **Services Modal**
*Professional service inquiry form with file upload*

### 🌓 **Dark/Light Theme**
*Seamless theme switching for comfortable viewing*

> **Note**: Add actual screenshots by creating an `assets/` or `screenshots/` folder and linking them here.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is **MIT** licensed - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### **Deaneeth**

*Computer Science Undergraduate | AI/ML Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/deaneeth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/deaneeth)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@example.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://your-portfolio-url.com)

</div>

---

## 💖 Support

If you found this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with others

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For hosting and analytics
- **Shadcn/ui** - For UI component inspiration
- **Framer Motion** - For smooth animations
- **Lucide Icons** - For beautiful icons
- **Tailwind CSS** - For utility-first styling

---

<div align="center">

### 🌟 **Made with ❤️ and ☕ by Deaneeth**

*Building the future, one commit at a time.*

---

**⚡ Current Version**: `0.1.0` | **📅 Last Updated**: October 2025

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![Styled with Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)

</div>
