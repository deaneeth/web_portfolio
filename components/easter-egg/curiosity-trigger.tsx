'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FunFactResponse {
  funFact: string;
  source: 'groq-api' | 'fallback';
  note?: string;
}

export function CuriosityTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFact, setCurrentFact] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [previousFacts, setPreviousFacts] = useState<string[]>([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [showQuestionInput, setShowQuestionInput] = useState(false);

  // Play subtle notification sound
  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create a pleasant chord progression
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      const duration = 0.3;
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + duration + index * 0.1);
      });
    } catch (error) {
      // Fallback: silent operation if Web Audio API fails
      console.log('🎵 Notification sound would play here!');
    }
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
          previousFacts: previousFacts
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch fun fact');
      }

      const data: FunFactResponse = await response.json();
      
      setCurrentFact(data.funFact);
      setPreviousFacts(prev => [...prev, data.funFact]);
      
      if (data.note) {
        toast.info(data.note);
      }
      
    } catch (error) {
      console.error('Error fetching fun fact:', error);
      
      // Enhanced fallback facts
      const fallbackFacts = [
        "🎯 Dineth has an 'overdelivery mindset' - he always gives more value than expected!",
        "⚡ His ADHD-powered creativity turns challenges into innovative solutions!",
        "🎨 He's served 5,000+ clients on Fiverr while studying Computer Science!",
        "🚀 Dineth believes 'The future belongs to those who code it' - and he's coding it!",
        "🧠 He combines strategic empathy with technical precision - a rare combo!",
        "💫 As a 'Poet with a Keyboard', he blends creativity with code!",
        "🎓 He's graduating in December 2026 from University of Plymouth, Sri Lanka!",
        "🌟 Dineth specializes in AI/ML while being a creative technologist!",
        "🎵 Music, tech, and innovation fuel his creative process!",
        "🔮 He's building technology that shapes tomorrow, one project at a time!"
      ];
      
      const availableFacts = fallbackFacts.filter(fact => !previousFacts.includes(fact));
      const factsToUse = availableFacts.length > 0 ? availableFacts : fallbackFacts;
      const randomFact = factsToUse[Math.floor(Math.random() * factsToUse.length)];
      
      setCurrentFact(randomFact);
      setPreviousFacts(prev => [...prev, randomFact]);
      
      toast.error('ARIA is thinking too hard right now, but here\'s a fun fact!');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    playNotificationSound();
    if (!currentFact) {
      fetchFunFact();
    }
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowQuestionInput(false);
    setUserQuestion('');
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
  React.useEffect(() => {
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
      {/* Curiosity Trigger Icon */}
      <motion.button
        onClick={openModal}
        className="group relative p-3 bg-gradient-to-r from-teal-500/20 to-purple-500/20 border border-teal-500/30 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-black"
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Discover a fun fact about Deaneeth"
        style={{
          boxShadow: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(20, 184, 166, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="h-5 w-5 text-teal-400 group-hover:text-teal-300 transition-colors duration-200" />
        </motion.div>
        
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/30 to-purple-500/30"
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
            {/* Background glow effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-purple-500/10 to-orange-500/10 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="relative bg-gray-900/95 border border-gray-800/50 rounded-2xl max-w-md w-full backdrop-blur-md shadow-2xl overflow-hidden"
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
                    'linear-gradient(45deg, #14b8a6, #a855f7, #f97316, #ec4899, #14b8a6)',
                    'linear-gradient(90deg, #a855f7, #f97316, #ec4899, #14b8a6, #a855f7)',
                    'linear-gradient(135deg, #f97316, #ec4899, #14b8a6, #a855f7, #f97316)',
                    'linear-gradient(180deg, #ec4899, #14b8a6, #a855f7, #f97316, #ec4899)',
                    'linear-gradient(225deg, #14b8a6, #a855f7, #f97316, #ec4899, #14b8a6)'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: 'linear-gradient(45deg, #14b8a6, #a855f7, #f97316, #ec4899, #14b8a6)',
                  backgroundSize: '400% 400%'
                }}
              >
                <div className="w-full h-full bg-gray-900/95 rounded-2xl" />
              </motion.div>

              {/* Modal Content */}
              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="p-2 bg-gradient-to-r from-teal-500 to-purple-500 rounded-lg"
                    >
                      <Sparkles className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <h2 id="modal-title" className="text-lg font-bold text-white">
                        ARIA's Fun Facts
                      </h2>
                      <p className="text-xs text-gray-400">Curiosity detected! 🤖</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeModal}
                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </Button>
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
                        <RefreshCw className="h-5 w-5 text-teal-400" />
                      </motion.div>
                      <span className="text-gray-300">ARIA is thinking...</span>
                    </div>
                  ) : (
                    <p className="text-gray-300 leading-relaxed">
                      {currentFact || "🤖 Ready to discover something amazing about Deaneeth?"}
                    </p>
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
                        <input
                          type="text"
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Ask ARIA about Deaneeth..."
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!userQuestion.trim() || isLoading}
                          className="bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:scale-105 transition-all duration-200"
                        >
                          Ask
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
                      className="flex-1 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all duration-300"
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
                      className="border-gray-600 text-gray-300 hover:bg-white/10 hover:border-white/20"
                      aria-label="Ask a question"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {previousFacts.length > 1 && (
                    <p className="text-xs text-gray-500 text-center">
                      {previousFacts.length} facts discovered this session
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}