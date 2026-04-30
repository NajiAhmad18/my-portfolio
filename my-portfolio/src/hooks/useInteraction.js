import { useCallback } from 'react';

export const useInteraction = () => {
  const playSound = useCallback(() => {
    // Volume: 10-20%
    // Duration: < 100ms
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03);

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // very low volume
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.03); // ultra short pop
    } catch (e) {
      // Ignore if AudioContext is not supported
    }
  }, []);

  const triggerHaptic = useCallback((type = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(type === 'medium' ? 20 : 10);
    }
  }, []);

  const triggerFeedback = useCallback((hapticType = 'light') => {
    // Only trigger feedback for primary clicks, toggles, selections
    playSound();
    triggerHaptic(hapticType);
  }, [playSound, triggerHaptic]);

  return { triggerFeedback };
};
