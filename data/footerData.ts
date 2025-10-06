export interface FooterNavLink {
  name: string;
  href: string;
}

export interface FooterSocialLink {
  name: string;
  icon: string;
  href: string;
  color: string;
}

export interface FooterContactInfo {
  address: string;
  email: string;
}

// Scrolling banner text
export const scrollingBannerText = "Dineth Hettiarachchi | Builder of Futures | AI/ML Explorer | Deaneeth";

// Contact information
export const contactInfo: FooterContactInfo = {
  address: "123 Creative Street, Suite 456, Colombo, Sri Lanka",
  email: "dineth@deaneeth.dev"
};

// Navigation links
export const navigationLinks: FooterNavLink[] = [
  { name: "Homepage", href: "/" },
  { name: "About", href: "/about" },
  { name: "Featured Work", href: "/work" },
  { name: "Creative Services", href: "/services" },
  { name: "Articles", href: "/articles" },
  { name: "Achievement Wall", href: "/achievements" },
  { name: "Get in Touch", href: "/contact" }
];

// Legal/Info links
export const legalLinks: FooterNavLink[] = [
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" }
];

// Social media links (matching your existing social buttons)
export const socialLinks: FooterSocialLink[] = [
  {
    name: "GitHub",
    icon: "github",
    href: "https://github.com/deaneeth",
    color: "#333"
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://linkedin.com/in/deaneeth",
    color: "#0077b5"
  },
  {
    name: "Facebook",
    icon: "facebook",
    href: "https://facebook.com/deaneeth",
    color: "#1877f2"
  },
  {
    name: "Twitter",
    icon: "twitter",
    href: "https://x.com/deaneeth",
    color: "#000000"
  }
];

// Copyright text
export const copyrightText = "© 2025 Dineth Hettiarachchi - Built with passion & AI";
