export interface Experience {
  location: string;
  company: string;
  role: string;
  period: string;
  startDate: string; // Format: "YYYY-MM" for sorting
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    location: "San Francisco, CA",
    company: "Digital Innovations Agency",
    role: "Senior Web Designer",
    period: "Jan 2019 – Present",
    startDate: "2019-01",
    highlights: [
      "Led the redesign of high-traffic websites, resulting in a 30% increase in user engagement.",
      "Managed a team of junior designers, providing mentorship and overseeing project timelines.",
      "Collaborated with cross-functional teams to develop innovative design solutions for diverse clients.",
      "Implemented responsive design principles to ensure optimal performance across all devices.",
    ],
  },
  {
    location: "Los Angeles, CA",
    company: "Creative Solutions Studio",
    role: "Web Designer",
    period: "Jun 2013 – Dec 2018",
    startDate: "2013-06",
    highlights: [
      "Designed and developed over 50 custom websites for small to medium-sized businesses.",
      "Conducted usability testing and user research to enhance site functionality and user satisfaction.",
      "Created wireframes, mockups, and prototypes to communicate design concepts effectively.",
      "Utilized HTML, CSS, and JavaScript to bring design visions to life.",
    ],
  },
];

// Sort experiences by start date (most recent first)
export const getSortedExperiences = (): Experience[] => {
  return [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
};
