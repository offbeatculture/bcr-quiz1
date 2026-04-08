import { useEffect, useRef } from 'react';
import { useQuiz } from '../../state/QuizContext';
import {
  initPixel,
  trackQuizProgressEvent,
  trackSessionDurationEvent,
  trackAbandonCartEvent,
} from '../../utils/pixel';

export function PixelTracker() {
  const { currentScreen, progress } = useQuiz();
  const startTimeRef = useRef<number>(Date.now());
  const sentProgressRef = useRef({ fifty: false, seventyFive: false });

  useEffect(() => {
    initPixel();
  }, []);

  useEffect(() => {
    if (!sentProgressRef.current.fifty && progress >= 50) {
      trackQuizProgressEvent(50, currentScreen);
      sentProgressRef.current.fifty = true;
    }
    if (!sentProgressRef.current.seventyFive && progress >= 75) {
      trackQuizProgressEvent(75, currentScreen);
      sentProgressRef.current.seventyFive = true;
    }
  }, [currentScreen, progress]);

  useEffect(() => {
    const sendDuration = () => {
      const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackSessionDurationEvent(durationSeconds, currentScreen, progress);
      if (progress < 100) {
        trackAbandonCartEvent(currentScreen, progress, durationSeconds);
      }
    };

    window.addEventListener('pagehide', sendDuration);
    window.addEventListener('beforeunload', sendDuration);

    return () => {
      window.removeEventListener('pagehide', sendDuration);
      window.removeEventListener('beforeunload', sendDuration);
    };
  }, [currentScreen, progress]);

  return null;
}
