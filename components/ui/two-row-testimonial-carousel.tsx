"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

interface TwoRowTestimonialCarouselProps {
  testimonials: Testimonial[];
  animationDuration?: number; // Duration in seconds for one complete scroll
}

export function TwoRowTestimonialCarousel({
  testimonials,
  animationDuration = 30,
}: TwoRowTestimonialCarouselProps) {
  // Split testimonials into two rows
  const halfLength = Math.ceil(testimonials.length / 2);
  const firstRowTestimonials = testimonials.slice(0, halfLength);
  const secondRowTestimonials = testimonials.slice(halfLength);

  // Triple testimonials for truly seamless infinite looping
  const firstRowDuplicated = [
    ...firstRowTestimonials,
    ...firstRowTestimonials,
    ...firstRowTestimonials,
  ];
  const secondRowDuplicated = [
    ...secondRowTestimonials,
    ...secondRowTestimonials,
    ...secondRowTestimonials,
  ];

  return (
    <div className="w-full overflow-hidden space-y-6">
      {/* First Row - Scrolls Left */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [0, `-${100 / 3}%`],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: animationDuration,
              ease: "linear",
            },
          }}
          style={{
            width: `${firstRowDuplicated.length * 404}px`, // 380px card + 24px gap
          }}
        >
          {firstRowDuplicated.map((testimonial, index) => (
            <TestimonialCard
              key={`row1-${index}`}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
      </div>

      {/* Second Row - Scrolls Right */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: [`-${100 / 3}%`, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: animationDuration,
              ease: "linear",
            },
          }}
          style={{
            width: `${secondRowDuplicated.length * 404}px`, // 380px card + 24px gap
          }}
        >
          {secondRowDuplicated.map((testimonial, index) => (
            <TestimonialCard
              key={`row2-${index}`}
              testimonial={testimonial}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Testimonial Card Component - Layout matching reference design
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      className="flex-shrink-0 w-[380px] p-6 rounded-xl bg-card border border-border shadow-sm
                 hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col"
      whileHover={{ y: -4 }}
    >
      {/* Top Section - Profile Picture & Name/Role (Horizontal) */}
      <div className="flex items-start gap-3 mb-4">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 
                          border-2 border-primary/30 flex items-center justify-center overflow-hidden">
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-primary">
                {testimonial.name.charAt(0)}
              </span>
            )}
          </div>
        </div>

        {/* Name & Role (Next to Profile Picture) */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-sm leading-tight mb-0.5">
            {testimonial.name}
          </h4>
          <p className="text-xs text-muted-foreground leading-tight">
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Middle Section - Testimonial Message */}
      <p className="text-foreground/90 text-sm leading-relaxed mb-4 flex-grow">
        {testimonial.content}
      </p>

      {/* Bottom Section - Star Rating */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
