import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Don't track admin routes
    if (location.pathname.startsWith('/admin')) return;

    const trackView = async () => {
      const today = new Date().toISOString().split('T')[0];
      const pagePath = location.pathname || '/';
      
      try {
        // 1. Update total page views for this specific path
        const pageRef = doc(db, 'analytics_pages', pagePath.replace(/\//g, '_') || 'home');
        await setDoc(pageRef, {
          path: pagePath,
          views: increment(1),
          lastVisited: new Date()
        }, { merge: true });

        // 2. Update daily stats
        const dailyRef = doc(db, 'analytics_daily', today);
        await setDoc(dailyRef, {
          date: today,
          views: increment(1)
        }, { merge: true });

        // 3. Update global stats
        const globalRef = doc(db, 'analytics_global', 'stats');
        await setDoc(globalRef, {
          totalViews: increment(1),
          lastUpdated: new Date()
        }, { merge: true });

      } catch (err) {
        console.warn('Analytics tracking failed', err);
      }
    };

    trackView();
  }, [location.pathname]);
}
