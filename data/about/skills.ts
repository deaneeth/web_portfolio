import { 
  Code2, 
  Brain, 
  Cpu, 
  Cloud, 
  Database, 
  Activity, 
  Zap, 
  Box, 
  GitBranch, 
  BarChart3, 
  LineChart, 
  TrendingUp 
} from 'lucide-react';
import { Skill } from '../types.d';

/**
 * Skills organized by category
 * Each skill includes a name and icon for visual representation
 */

export const aiMlSkills: Skill[] = [
  { name: 'Python', icon: Code2, category: 'aiMl' },
  { name: 'TensorFlow', icon: Brain, category: 'aiMl' },
  { name: 'PyTorch', icon: Brain, category: 'aiMl' },
  { name: 'Scikit-learn', icon: Brain, category: 'aiMl' },
  { name: 'Pandas', icon: Database, category: 'aiMl' },
  { name: 'NumPy', icon: Database, category: 'aiMl' },
  { name: 'OpenCV', icon: Activity, category: 'aiMl' },
  { name: 'Hugging Face', icon: Brain, category: 'aiMl' },
];

export const roboticsIotSkills: Skill[] = [
  { name: 'ROS', icon: Cpu, category: 'roboticsIot' },
  { name: 'Arduino', icon: Cpu, category: 'roboticsIot' },
  { name: 'Raspberry Pi', icon: Cpu, category: 'roboticsIot' },
  { name: 'ESP32', icon: Zap, category: 'roboticsIot' },
  { name: 'MQTT', icon: Activity, category: 'roboticsIot' },
  { name: 'Firebase', icon: Cloud, category: 'roboticsIot' },
  { name: 'Embedded C', icon: Code2, category: 'roboticsIot' },
];

export const cloudToolsSkills: Skill[] = [
  { name: 'Google Cloud AI', icon: Cloud, category: 'cloudTools' },
  { name: 'AWS IoT Core', icon: Cloud, category: 'cloudTools' },
  { name: 'Azure ML', icon: Cloud, category: 'cloudTools' },
  { name: 'Docker', icon: Box, category: 'cloudTools' },
  { name: 'Git & GitHub', icon: GitBranch, category: 'cloudTools' },
];

export const dataVizSkills: Skill[] = [
  { name: 'Power BI', icon: BarChart3, category: 'dataViz' },
  { name: 'Tableau', icon: LineChart, category: 'dataViz' },
  { name: 'Matplotlib', icon: TrendingUp, category: 'dataViz' },
  { name: 'Plotly', icon: BarChart3, category: 'dataViz' },
  { name: 'SQL', icon: Database, category: 'dataViz' },
];

/**
 * Skills data organized by category
 */
export const skillsData = {
  aiMl: aiMlSkills,
  roboticsIot: roboticsIotSkills,
  cloudTools: cloudToolsSkills,
  dataViz: dataVizSkills,
};

/**
 * All skills combined in a single flat array
 * Useful for general skill listings and search
 */
export const allSkills: Skill[] = [
  ...aiMlSkills,
  ...roboticsIotSkills,
  ...cloudToolsSkills,
  ...dataVizSkills,
];

/**
 * Skills distributed across carousel rows for display
 * Row distribution ensures balanced visual presentation
 */
export const row1Skills: Skill[] = [...allSkills.slice(0, 10), ...allSkills.slice(0, 10)];
export const row2Skills: Skill[] = [...allSkills.slice(10, 20), ...allSkills.slice(10, 20)];
export const row3Skills: Skill[] = [...allSkills.slice(20), ...allSkills.slice(0, 5), ...allSkills.slice(20), ...allSkills.slice(0, 5)];
