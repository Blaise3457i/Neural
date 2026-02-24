import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to a backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Have a question, suggestion, or want to report a tool? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Email Us</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-2">For general inquiries and support:</p>
                  <a href="mailto:ublaise775@gmail.com" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
                    ublaise775@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Community Support</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Join our community forums for quick answers from other AI enthusiasts.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Social Media</h3>
                  <p className="text-slate-500 dark:text-slate-400">
                    Follow us for the latest AI tool updates and prompts.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Response Time</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                We typically respond to all inquiries within 24-48 hours. Please be as detailed as possible in your message so we can provide the best assistance.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                  <input
                    required
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Subject</label>
                <input
                  required
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
