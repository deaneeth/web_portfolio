import { ProcessStep } from '../types.d';

/**
 * Service workflow process steps
 * Describes the end-to-end journey from initial contact to project delivery
 */
export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We discuss your needs, goals, and project requirements in detail.'
  },
  {
    step: 2,
    title: 'Proposal & Planning',
    description: 'I create a detailed proposal with timeline, deliverables, and pricing.'
  },
  {
    step: 3,
    title: 'Development',
    description: 'Active development with regular updates and milestone reviews.'
  },
  {
    step: 4,
    title: 'Testing & Refinement',
    description: 'Thorough testing and refinements based on your feedback.'
  },
  {
    step: 5,
    title: 'Delivery & Support',
    description: 'Final delivery with documentation and ongoing support.'
  }
];

/**
 * Get process step by number
 */
export const getProcessStepByNumber = (stepNumber: number): ProcessStep | undefined => {
  return processSteps.find(step => step.step === stepNumber);
};

/**
 * Get total number of process steps
 */
export const getTotalProcessSteps = (): number => {
  return processSteps.length;
};
