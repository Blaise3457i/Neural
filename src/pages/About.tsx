import { motion } from 'motion/react';
import { Target, Heart, Users, ShieldCheck } from 'lucide-react';

export function About() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">About AI Free Hub</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            Founded by <span className="text-purple-600 dark:text-purple-400 font-bold">UWURUKUNDO BLAISE</span>, AI Free Hub is dedicated to making artificial intelligence accessible to everyone by providing high-quality, free resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Our mission is to democratize AI by making powerful tools and expert prompts accessible to everyone, regardless of their budget. We believe AI should be a tool for empowerment, not a luxury.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quality & Accuracy</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              We are committed to maintaining the highest standards of accuracy and quality. Every tool and prompt in our directory is independently researched and curated by our team.
            </p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-black mb-8">Why AI Free Hub?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            The AI landscape is evolving rapidly, but many of the most innovative tools are hidden behind paywalls or complex interfaces. AI Free Hub was created to solve this problem by offering a central, easy-to-navigate repository of free AI resources.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            Whether you're a student, a creative professional, or a tech enthusiast, our platform provides you with the tools you need to harness the power of AI without any financial barriers.
          </p>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-12 text-white mb-24">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Commitment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-4xl font-black mb-2 text-purple-400">100%</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Free Focus</div>
              </div>
              <div>
                <div className="text-4xl font-black mb-2 text-blue-400">Verified</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Curation</div>
              </div>
              <div>
                <div className="text-4xl font-black mb-2 text-emerald-400">Daily</div>
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Updates</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-black mb-8">Independent Research</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
            We take pride in our independent curation process. We don't just list tools; we test them, evaluate their features, and ensure they provide genuine value to our users. Our goal is to be your most trusted source for free AI technology.
          </p>
        </div>
      </div>
    </div>
  );
}
