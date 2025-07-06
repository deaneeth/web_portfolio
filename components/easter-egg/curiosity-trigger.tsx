'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  RefreshCw, 
  MessageCircle, 
  Trophy,
  Star,
  Zap,
  Heart,
  Music,
  Code,
  Briefcase,
  GraduationCap,
  Volume2,
  VolumeX,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface FunFactResponse {
  funFact: string;
  source: 'groq-api' | 'fallback';
  note?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  music: Music,
  code: Code,
  work: Briefcase,
  education: GraduationCap,
  creativity: Sparkles,
  energy: Zap,
  heart: Heart,
  trophy: Trophy,
  star: Star,
};

export function CuriosityTrigger({ triggerType = 'main' }: { triggerType?: 'main' | 'skills' | 'journey' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [previousFacts, setPreviousFacts] = useState<string[]>([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play sound function
  const playSound = useCallback((type: 'open' | 'discover' | 'typing' | 'close' = 'open') => {
    if (!soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const soundConfigs = {
        open: { frequencies: [523.25, 659.25, 783.99], duration: 0.4 },
        discover: { frequencies: [659.25, 783.99, 987.77], duration: 0.5 },
        typing: { frequencies: [880], duration: 0.1 },
        close: { frequencies: [783.99, 659.25, 523.25], duration: 0.3 }
      };

      const config = soundConfigs[type];
      
      config.frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = type === 'typing' ? 'square' : 'sine';
        
        const startTime = audioContext.currentTime + index * 0.1;
        const volume = type === 'typing' ? 0.05 : 0.1;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + config.duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + config.duration);
      });
    } catch (error) {
      console.log(`🎵 ${type} sound would play here!`);
    }
  }, [soundEnabled]);

  // Typewriter effect
  const typeText = useCallback((text: string) => {
    setIsTyping(true);
    setTypedText('');
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        if (Math.random() > 0.7) playSound('typing');
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30 + Math.random() * 40);

    return () => clearInterval(interval);
  }, [playSound]);

  // Get contextual icon
  const getContextualIcon = (fact: string) => {
    const lowerFact = fact.toLowerCase();
    
    if (lowerFact.includes('music')) return { icon: Music, color: '#7D27F5' };
    if (lowerFact.includes('code') || lowerFact.includes('programming')) return { icon: Code, color: '#B794F4' };
    if (lowerFact.includes('fiverr') || lowerFact.includes('client')) return { icon: Briefcase, color: '#7D27F5' };
    if (lowerFact.includes('university') || lowerFact.includes('student')) return { icon: GraduationCap, color: '#B794F4' };
    if (lowerFact.includes('creative') || lowerFact.includes('art')) return { icon: Sparkles, color: '#7D27F5' };
    if (lowerFact.includes('energy') || lowerFact.includes('adhd')) return { icon: Zap, color: '#B794F4' };
    if (lowerFact.includes('heart') || lowerFact.includes('empathy')) return { icon: Heart, color: '#7D27F5' };
    
    return { icon: Star, color: '#7D27F5' };
  };

  const fetchFunFact = async (question?: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/.netlify/functions/groq-funfact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userQuestion: question,
          previousFacts: previousFacts,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch fun fact');
      }

      const data: FunFactResponse = await response.json();
      
      setCurrentFact(data.funFact);
      setPreviousFacts(prev => [...prev, data.funFact]);
      
      typeText(data.funFact);
      
      if (data.note) {
        toast.info(data.note);
      }
      
    } catch (error) {
      console.error('Error fetching fun fact:', error);
      
      const fallbackFacts = [
        "🎯 Dineth has an 'overdelivery mindset' - he always gives more value than expected!",
        "⚡ His ADHD-powered creativity turns challenges into innovative solutions!",
        "🎨 He's served 5,000+ clients on Fiverr while studying Computer Science!",
        "🚀 Dineth believes 'The future belongs to those who code it' - and he's coding it!",
        "🧠 He combines strategic empathy with technical precision - a rare combo!",
        "💫 As a 'Poet with a Keyboard', he blends creativity with code!",
        "🎓 He's graduating in December 2026 from University of Plymouth, Sri Lanka!",
        "🌟 Dineth specializes in AI/ML while being a creative technologist!"
      ];
      
      const availableFacts = fallbackFacts.filter(fact => !previousFacts?.includes(fact));
      const factsToUse = availableFacts.length > 0 ? availableFacts : fallbackFacts;
      const randomFact = factsToUse[Math.floor(Math.random() * factsToUse.length)];
      
      setCurrentFact(randomFact);
      setPreviousFacts(prev => [...prev, randomFact]);
      typeText(randomFact);
      
      toast.error('ARIA is thinking too hard right now, but here\'s a fun fact!');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    playSound('open');
    if (!currentFact) {
      fetchFunFact();
    }
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowQuestionInput(false);
    setUserQuestion('');
    playSound('close');
    document.body.style.overflow = 'unset';
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userQuestion.trim()) {
      fetchFunFact(userQuestion.trim());
      setUserQuestion('');
      setShowQuestionInput(false);
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Curiosity Trigger Button */}
      <motion.button
        onClick={openModal}
        className="group relative p-3 bg-[#7D27F5]/20 border border-[#7D27F5]/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#7D27F5]/50 focus:ring-offset-2 focus:ring-offset-[#1D1D21]"
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask ARIA about Deaneeth"
      >
        <motion.div
          animate={{
            rotate: [0, 180, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="h-5 w-5 text-[#7D27F5] group-hover:text-[#B794F4] transition-colors duration-200" />
        </motion.div>
        
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#7D27F5]/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="relative bg-[#1D1D21]/95 border border-[#7D27F5]/30 rounded-2xl max-w-md w-full backdrop-blur-md shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 rounded-2xl p-[2px]"
                animate={{
                  background: [
                    'linear-gradient(45deg, #7D27F5, #B794F4, #7D27F5)',
                    'linear-gradient(90deg, #B794F4, #7D27F5, #B794F4)',
                    'linear-gradient(135deg, #7D27F5, #B794F4, #7D27F5)',
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full bg-[#1D1D21]/95 rounded-2xl" />
              </motion.div>

              {/* Modal Content */}
              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="p-2 bg-[#7D27F5] rounded-lg"
                    >
                      <Sparkles className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <h2 id="modal-title" className="text-lg font-bold text-white">
                        Ask ARIA
                      </h2>
                      <p className="text-xs text-white/60">
                        AI Assistant about Deaneeth
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                      aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
                    >
                      {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeModal}
                      className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Fun Fact Display */}
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
                  id="modal-description"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="h-5 w-5 text-[#7D27F5]" />
                      </motion.div>
                      <span className="text-white/80">ARIA is thinking...</span>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3">
                      {currentFact && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="flex-shrink-0 mt-1"
                        >
                          {(() => {
                            const { icon: ContextIcon, color } = getContextualIcon(currentFact);
                            return (
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.1, 1],
                                  rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                style={{ color }}
                              >
                                <ContextIcon className="h-6 w-6" />
                              </motion.div>
                            );
                          })()}
                        </motion.div>
                      )}
                      
                      <div className="flex-1">
                        <p className="text-white/80 leading-relaxed">
                          {isTyping ? typedText : (currentFact || "🤖 Ready to discover something amazing about Deaneeth?")}
                          {isTyping && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="ml-1 text-[#7D27F5]"
                            >
                              |
                            </motion.span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Question Input */}
                <AnimatePresence>
                  {showQuestionInput && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleQuestionSubmit}
                      className="mb-4 overflow-hidden"
                    >
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Ask ARIA about Deaneeth..."
                          className="flex-1 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#7D27F5] focus:ring-[#7D27F5]/20"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!userQuestion.trim() || isLoading}
                          className="bg-[#7D27F5] text-white hover:bg-[#B794F4] transition-all duration-200"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <Button
                      onClick={() => fetchFunFact()}
                      disabled={isLoading}
                      className="flex-1 bg-[#7D27F5] text-white font-semibold hover:bg-[#B794F4] transition-all duration-300"
                    >
                      {isLoading ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      {currentFact ? 'Another Fun Fact' : 'Reveal Fun Fact'}
                    </Button>
                    
                    <Button
                      onClick={() => setShowQuestionInput(!showQuestionInput)}
                      variant="outline"
                      className="border-[#7D27F5]/30 text-white/80 hover:bg-white/10 hover:border-[#7D27F5]"
                      aria-label="Ask a question"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-center text-xs text-white/40">
                    {previousFacts.length} facts discovered this session
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}