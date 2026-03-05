import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AITool } from '../types';
import { motion } from 'motion/react';
import { ExternalLink, ArrowLeft, Star, Shield, Zap, Globe, Loader2 } from 'lucide-react';

export function ToolDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTool = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'tools', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTool({ id: docSnap.id, ...docSnap.data() } as AITool);
        } else {
          navigate('/tools');
        }
      } catch (err) {
        console.error('Error fetching tool:', err);
        navigate('/tools');
      } finally {
        setLoading(false);
      }
    };
    fetchTool();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!tool) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-purple-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image & Quick Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="aspect-video relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-12 shadow-2xl">
              <img 
                src={tool.image} 
                alt={tool.name} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 right-6">
                <span className="bg-purple-600 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg">
                  {tool.isFree ? 'FREE' : 'FREEMIUM'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center">
                <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <span className="block text-xl font-black text-slate-900 dark:text-white">4.9</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rating</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center">
                <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <span className="block text-xl font-black text-slate-900 dark:text-white">Fast</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Speed</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center">
                <Shield className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <span className="block text-xl font-black text-slate-900 dark:text-white">Safe</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                {tool.category}
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                {tool.name}
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-600" />
                Why use {tool.name}?
              </h3>
              <ul className="space-y-4">
                {[
                  'Industry-leading AI algorithms',
                  'User-friendly interface for all levels',
                  'Regular updates and new features',
                  'Highly rated by the AI community'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
              <a 
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-purple-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-purple-700 transition-all shadow-xl shadow-purple-600/20 active:scale-95 group"
              >
                Access {tool.name}
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <p className="mt-4 text-sm text-slate-400">
                Direct link to official website. Always verify terms of service.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
