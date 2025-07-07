'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  Brain, 
  Cloud, 
  Database, 
  Palette, 
  Globe,
  Terminal,
  Cpu
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'C++', level: 75 },
    ],
  },
  {
    title: 'AI/ML & Data Science',
    icon: Brain,
    skills: [
      { name: 'TensorFlow/PyTorch', level: 85 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'Pandas/NumPy', level: 95 },
      { name: 'Computer Vision', level: 80 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD', level: 80 },
    ],
  },
  {
    title: 'Web Development',
    icon: Globe,
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'FastAPI/Flask', level: 80 },
      { name: 'GraphQL', level: 75 },
    ],
  },
];

const tools = [
  'Git', 'VS Code', 'Jupyter', 'Figma', 'Canva', 'Adobe Creative Suite',
  'Terraform', 'MongoDB', 'PostgreSQL', 'Redis', 'Linux', 'Bash'
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit built through continuous learning and hands-on experience
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glow h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <category.icon className="mr-3 h-6 w-6 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: (categoryIndex * 0.1) + (skillIndex * 0.1) 
                        }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge variant="secondary" className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  {tool}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}