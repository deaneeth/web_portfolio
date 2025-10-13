import { Testimonial } from '../types.d';

/**
 * Client testimonials showcasing service quality and client satisfaction
 * Each testimonial includes client details, feedback, and rating
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO, TechCorp',
    company: 'TechCorp',
    content: 'Deaneeth delivered an exceptional AI solution that transformed our data analysis capabilities. Professional, innovative, and results-driven.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2024-11-01',
    verifyUrl: '#'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Founder, StartupXYZ',
    company: 'StartupXYZ',
    content: 'The automation solution saved us 20+ hours per week. Incredible attention to detail and seamless implementation.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2024-10-15',
    verifyUrl: '#'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Manager, InnovateLab',
    company: 'InnovateLab',
    content: 'Outstanding web application that exceeded our expectations. Fast delivery and excellent communication throughout.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2024-09-28',
    verifyUrl: '#'
  },
  {
    id: 4,
    name: 'David Martinez',
    role: 'CEO, DataFlow Inc',
    company: 'DataFlow Inc',
    content: 'The ML model built for us has significantly improved our prediction accuracy. Highly recommended!',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2024-09-10',
    verifyUrl: '#'
  },
  {
    id: 5,
    name: 'Amanda Foster',
    role: 'Operations Director, CloudNet',
    company: 'CloudNet',
    content: 'Fantastic automation workflows that streamlined our entire operation. Professional and efficient service.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2024-08-22',
    verifyUrl: '#'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Tech Lead, Innovate Solutions',
    company: 'Innovate Solutions',
    content: 'Excellent technical consulting and code architecture. Helped us avoid major pitfalls in our project.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2024-08-05',
    verifyUrl: '#'
  }
];

/**
 * Get testimonials sorted by date (newest first)
 */
export const getTestimonialsSortedByDate = (): Testimonial[] => {
  return [...testimonials].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

/**
 * Get testimonials with specific rating
 */
export const getTestimonialsByRating = (rating: number): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.rating === rating);
};
