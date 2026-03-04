import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin routes
    if (location.pathname.startsWith('/admin')) return;

    const trackView = async () => {
      try {
        await addDoc(collection(db, 'page_views'), {
          path: location.pathname,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        });
      } catch (err) {
        // Silently fail to not interrupt user experience
        console.warn('Analytics tracking failed', err);
      }
    };

    trackView();
  }, [location.pathname]);

  return null;
}
