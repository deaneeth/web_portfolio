'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  RefreshCw, 
  MessageCircle, 
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
      {/* Ask ARIA Button - Prominent but Minimal */}
      <motion.button
        onClick={openModal}
        className="btn btn-primary group relative magnetic"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask ARIA about Deaneeth"
      >
        <div className="flex items-center space-x-3">
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
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-sm font-medium text-white">
            Ask ARIA
          </span>
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 60 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="relative card max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >

              {/* Modal Content */}
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-primary rounded-2xl"
                    >
                      <Sparkles className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h2 id="modal-title" className="text-xl font-bold text-foreground">
                        Ask ARIA
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        AI Assistant about Deaneeth
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="magnetic"
                      aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
                    >
                      {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={closeModal}
                      className="magnetic"
                      aria-label="Close modal"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                {/* Fun Fact Display */}
                <motion.div
                  key={currentFact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 p-6 bg-muted/30 rounded-2xl border border-border"
                  id="modal-description"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="h-6 w-6 text-primary" />
                      </motion.div>
                      <span className="text-foreground">ARIA is thinking...</span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-foreground">
                        {isTyping ? typedText : (currentFact || "🤖 Ready to discover something amazing about Deaneeth?")}
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="ml-1 text-primary"
                          >
                            |
                          </motion.span>
                        )}
                      </p>
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
                      className="mb-6 overflow-hidden"
                    >
                      <div className="flex gap-3">
                        <Input
                          type="text"
                          value={userQuestion}
                          onChange={(e) => setUserQuestion(e.target.value)}
                          placeholder="Ask ARIA about Deaneeth..."
                          className="flex-1 form-input"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!userQuestion.trim() || isLoading}
                          className="btn-primary magnetic"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Button
                      onClick={() => fetchFunFact()}
                      disabled={isLoading}
                      className="flex-1 btn btn-primary magnetic"
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
                      className="btn btn-outline magnetic"
                      aria-label="Ask a question"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
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