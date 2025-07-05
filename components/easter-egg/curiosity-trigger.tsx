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
  VolumeX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FunFactResponse {
  funFact: string;
  source: 'groq-api' | 'fallback';
  note?: string;
}

interface DiscoveryState {
  mainTrigger: boolean;
  skillsTrigger: boolean;
  journeyTrigger: boolean;
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
  const [discoveryState, setDiscoveryState] = useState<DiscoveryState>({
    mainTrigger: false,
    skillsTrigger: false,
    journeyTrigger: false,
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ariaMood, setAriaMood] = useState<'curious' | 'excited' | 'playful' | 'amazed'>('curious');

  // Load discovery state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aria-discovery-state');
    if (saved) {
      try {
        setDiscoveryState(JSON.parse(saved));
      } catch (e) {
        console.log('Could not parse saved discovery state');
      }
    }
  }, []);

  // Save discovery state to localStorage
  const saveDiscoveryState = useCallback((newState: DiscoveryState) => {
    setDiscoveryState(newState);
    localStorage.setItem('aria-discovery-state', JSON.stringify(newState));
  }, []);

  // Calculate progress
  const discoveredCount = Object.values(discoveryState).filter(Boolean).length;
  const totalSecrets = Object.keys(discoveryState).length;
  const allSecretsFound = discoveredCount === totalSecrets;

  // Enhanced sound system with different tones
  const playSound = useCallback((type: 'open' | 'discover' | 'milestone' | 'typing' | 'close' = 'open') => {
    if (!soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const soundConfigs = {
        open: { frequencies: [523.25, 659.25, 783.99], duration: 0.4 },
        discover: { frequencies: [659.25, 783.99, 987.77], duration: 0.5 },
        milestone: { frequencies: [523.25, 659.25, 783.99, 987.77, 1174.66], duration: 0.8 },
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
        const volume = type === 'milestone' ? 0.15 : type === 'typing' ? 0.05 : 0.1;
        
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
        if (Math.random() > 0.7) playSound('typing'); // Random typing sounds
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30 + Math.random() * 40); // Variable typing speed for realism

    return () => clearInterval(interval);
  }, [playSound]);

  // Extract and animate contextual emoji/icon
  const getContextualIcon = (fact: string) => {
    const lowerFact = fact.toLowerCase();
    
    if (lowerFact.includes('music')) return { icon: Music, color: '#f97316' };
    if (lowerFact.includes('code') || lowerFact.includes('programming')) return { icon: Code, color: '#14b8a6' };
    if (lowerFact.includes('fiverr') || lowerFact.includes('client')) return { icon: Briefcase, color: '#a855f7' };
    if (lowerFact.includes('university') || lowerFact.includes('student')) return { icon: GraduationCap, color: '#3b82f6' };
    if (lowerFact.includes('creative') || lowerFact.includes('art')) return { icon: Sparkles, color: '#ec4899' };
    if (lowerFact.includes('energy') || lowerFact.includes('adhd')) return { icon: Zap, color: '#f59e0b' };
    if (lowerFact.includes('heart') || lowerFact.includes('empathy')) return { icon: Heart, color: '#ef4444' };
    
    return { icon: Star, color: '#14b8a6' };
  };

  // ARIA personality responses
  const getAriaResponse = (mood: typeof ariaMood, isFirstTime: boolean) => {
    const responses = {
      curious: [
        "🤖 Curiosity detected! Let me share something fascinating...",
        "✨ Ooh, a fellow explorer! Here's what I know...",
        "🔍 Perfect timing! I've got something interesting..."
      ],
      excited: [
        "🚀 This is getting exciting! Another secret revealed...",
        "⚡ You're on fire! Here's another amazing fact...",
        "🎉 Look at you go! Discovery mode activated..."
      ],
      playful: [
        "😄 You're really getting the hang of this! Here's more...",
        "🎭 Plot twist incoming! Did you know...",
        "🎪 The curiosity circus continues! Check this out..."
      ],
      amazed: [
        "🤯 WOW! You found them all! Here's the ultimate secret...",
        "👑 Curiosity champion! You've unlocked everything...",
        "🌟 LEGENDARY! You've mastered the art of discovery..."
      ]
    };

    const moodResponses = responses[mood];
    return moodResponses[Math.floor(Math.random() * moodResponses.length)];
  };

  const fetchFunFact = async (question?: string) => {
    setIsLoading(true);
    
    // Update ARIA's mood based on discovery progress
    if (discoveredCount === 0) setAriaMood('curious');
    else if (discoveredCount === 1) setAriaMood('excited');
    else if (discoveredCount === 2) setAriaMood('playful');
    else setAriaMood('amazed');
    
    try {
      const response = await fetch('/.netlify/functions/groq-funfact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userQuestion: question,
          previousFacts: previousFacts,
          discoveryProgress: discoveredCount,
          allSecretsFound: allSecretsFound
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch fun fact');
      }

      const data: FunFactResponse = await response.json();
      
      setCurrentFact(data.funFact);
      setPreviousFacts(prev => [...prev, data.funFact]);
      
      // Start typing animation
      typeText(data.funFact);
      
      if (data.note) {
        toast.info(data.note);
      }
      
    } catch (error) {
      console.error('Error fetching fun fact:', error);
      
      // Enhanced fallback facts with contextual emojis
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
      typeText(randomFact);
      
      toast.error('ARIA is thinking too hard right now, but here\'s a fun fact!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTriggerClick = () => {
    // Mark this trigger as discovered
    const newState = { ...discoveryState, [triggerType + 'Trigger']: true };
    saveDiscoveryState(newState);
    
    // Play appropriate sound
    if (Object.values(newState).filter(Boolean).length === totalSecrets) {
      playSound('milestone');
      toast.success('🎉 All secrets discovered! You\'ve unlocked ARIA\'s ultimate mode!');
    } else {
      playSound('discover');
      toast.success(`Secret ${Object.values(newState).filter(Boolean).length}/${totalSecrets} discovered!`);
    }
    
    openModal();
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

  // Get trigger icon based on type
  const getTriggerIcon = () => {
    switch (triggerType) {
      case 'skills': return Code;
      case 'journey': return GraduationCap;
      default: return Sparkles;
    }
  };

  const TriggerIcon = getTriggerIcon();
  const isDiscovered = discoveryState[triggerType + 'Trigger' as keyof DiscoveryState];

  return (
    <>
      {/* Curiosity Trigger Icon */}
      <motion.button
        onClick={handleTriggerClick}
        className={`group relative p-3 border rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-black ${
          isDiscovered 
            ? 'bg-gradient-to-r from-teal-500/30 to-purple-500/30 border-teal-500/50' 
            : 'bg-gradient-to-r from-teal-500/20 to-purple-500/20 border-teal-500/30'
        }`}
        whileHover={{ 
          scale: 1.1,
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Discover a fun fact about Deaneeth (${triggerType})`}
        style={{ boxShadow: 'none' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(20, 184, 166, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <motion.div
          animate={{
            rotate: isDiscovered ? [0, 360] : [0, 180, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: isDiscovered ? 2 : 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <TriggerIcon className={`h-5 w-5 transition-colors duration-200 ${
            isDiscovered ? 'text-teal-300' : 'text-teal-400 group-hover:text-teal-300'
          }`} />
        </motion.div>
        
        {/* Discovery indicator */}
        {isDiscovered && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-full h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500"
            />
          </motion.div>
        )}
        
        {/* Pulsing glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isDiscovered 
              ? 'bg-gradient-to-r from-teal-500/40 to-purple-500/40' 
              : 'bg-gradient-to-r from-teal-500/30 to-purple-500/30'
          }`}
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
            {/* Constellation effect for all secrets found */}
            {allSecretsFound && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}

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
                      <p className="text-xs text-gray-400">
                        {getAriaResponse(ariaMood, discoveredCount === 0)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Sound toggle */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                      aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
                    >
                      {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                    
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
                </div>

                {/* Progress Tracker */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Curiosity Progress</span>
                    <span className="text-sm font-semibold text-teal-400">
                      {discoveredCount}/{totalSecrets}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-teal-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(discoveredCount / totalSecrets) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  {allSecretsFound && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center mt-2 text-xs text-yellow-400"
                    >
                      <Trophy className="h-4 w-4 mr-1" />
                      Curiosity Master Unlocked!
                    </motion.div>
                  )}
                </motion.div>

                {/* Fun Fact Display with Contextual Icon */}
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
                    <div className="flex items-start space-x-3">
                      {/* Contextual Icon */}
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
                      
                      {/* Typed Text */}
                      <div className="flex-1">
                        <p className="text-gray-300 leading-relaxed">
                          {isTyping ? typedText : (currentFact || "🤖 Ready to discover something amazing about Deaneeth?")}
                          {isTyping && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="ml-1 text-teal-400"
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
                  
                  {/* Session Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {previousFacts.length} facts discovered this session
                    </span>
                    {allSecretsFound && (
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-yellow-400 font-semibold"
                      >
                        🎉 All secrets unlocked!
                      </motion.span>
                    )}
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