export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export const faqCategories = {
  general: "General",
  services: "Services & Work",
  collaboration: "Collaboration",
  technical: "Technical"
};

export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "I specialize in AI/ML development, full-stack web development, and intelligent automation solutions. My expertise includes building scalable applications, implementing machine learning models, creating responsive web interfaces, and developing custom automation tools to streamline business processes.",
    category: "services"
  },
  {
    id: 2,
    question: "How can I collaborate with you on a project?",
    answer: "Getting started is easy! You can reach out through the 'Get in Touch' page or send me an email directly at dineth@deaneeth.dev. I'll respond within 24 hours to discuss your project requirements, timeline, and how we can work together to bring your vision to life.",
    category: "collaboration"
  },
  {
    id: 3,
    question: "What technologies do you work with?",
    answer: "I work with modern technologies including Python, JavaScript/TypeScript, React, Next.js, Node.js, TensorFlow, PyTorch, and various cloud platforms (AWS, Azure, GCP). I'm also experienced with databases (PostgreSQL, MongoDB), Docker, Kubernetes, and DevOps practices. I continuously learn and adapt to new technologies based on project needs.",
    category: "technical"
  },
  {
    id: 4,
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A simple website might take 2-3 weeks, while a complex AI/ML solution could take 2-3 months. During our initial consultation, I'll provide a detailed timeline and milestone breakdown tailored to your specific project requirements.",
    category: "collaboration"
  },
  {
    id: 5,
    question: "Do you work with clients remotely?",
    answer: "Absolutely! I work with clients globally and have extensive experience with remote collaboration. I use modern project management tools, maintain clear communication channels, and provide regular updates throughout the development process. Time zones are never a barrier to delivering exceptional work.",
    category: "general"
  },
  {
    id: 6,
    question: "Can you help with both new projects and existing codebases?",
    answer: "Yes! I can help you start a new project from scratch with best practices and modern architecture, or dive into your existing codebase to add features, optimize performance, fix bugs, or refactor code. I'm experienced in code reviews, technical debt reduction, and modernizing legacy systems.",
    category: "services"
  },
  {
    id: 7,
    question: "What makes your approach to AI/ML unique?",
    answer: "I combine technical expertise with strategic thinking. Beyond implementing models, I focus on understanding your business goals, ensuring solutions are scalable, maintainable, and provide real value. I emphasize explainable AI, ethical considerations, and creating systems that your team can understand and build upon.",
    category: "technical"
  },
  {
    id: 8,
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes! I offer flexible support and maintenance packages post-launch. This includes bug fixes, performance monitoring, security updates, feature enhancements, and technical support. I believe in building long-term partnerships with clients and ensuring your solution continues to perform optimally.",
    category: "services"
  }
];

// Helper function to get FAQs by category
export const getFAQsByCategory = (category: string): FAQItem[] => {
  return faqData.filter(faq => faq.category === category);
};

// Helper function to get all categories with FAQ counts
export const getCategoryCounts = () => {
  return Object.entries(faqCategories).map(([key, label]) => ({
    key,
    label,
    count: faqData.filter(faq => faq.category === key).length
  }));
};
