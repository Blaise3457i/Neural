import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function SiteConfig() {
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsSnap = await getDocs(collection(db, 'settings')).catch(e => {
          console.warn('Settings collection inaccessible (likely permission rules)', e);
          return { docs: [] };
        });
        const settings: Record<string, string> = {};
        (settingsSnap as any).docs.forEach((doc: any) => {
          const data = doc.data();
          settings[data.key] = data.value;
        });

        if (settings.site_title) {
          document.title = settings.site_title;
        }
        
        if (settings.meta_description) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', settings.meta_description);
        }

        if (settings.meta_keywords) {
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.setAttribute('content', settings.meta_keywords);
        }
      } catch (err) {
        console.error('Failed to fetch site settings', err);
      }
    };

    fetchSettings();
  }, []);

  return null;
}
