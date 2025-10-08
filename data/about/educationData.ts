export interface Education {
  location: string;
  institution: string;
  degree: string;
  description: string;
  period: string;
  startDate: string; // Format "YYYY-MM" for sorting
}

export const education: Education[] = [
  {
    location: "Plymouth, UK",
    institution: "University of California",
    degree: "Master of Science in Web Design and Development",
    description: "Focused on advanced web technologies, user experience design, and front-end development.",
    period: "2010 – 2012",
    startDate: "2010-09",
  },
  {
    location: "Seattle, WA",
    institution: "University of Washington",
    degree: "Bachelor of Fine Arts in Graphic Design",
    description: "Emphasized visual communication, design principles, and digital media.",
    period: "2002 – 2006",
    startDate: "2002-09",
  },
];

// Sort education by start date (most recent first)
export const getSortedEducation = (): Education[] => {
  return [...education].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
};
