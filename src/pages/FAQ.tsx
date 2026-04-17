import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "What is ConsoleFlow Mobile?",
    answer: "It is a lightweight Android web browser created specifically for developers. It automatically injects the Eruda console into every webpage you visit, allowing you to debug DOM, Network, and Console directly on your phone."
  },
  {
    question: "Do I need to root my device?",
    answer: "No, ConsoleFlow works perfectly on any standard Android device without root access."
  },
  {
    question: "Does it work on iOS?",
    answer: "Currently, ConsoleFlow is only available for Android via APK download."
  },
  {
    question: "Why do some websites block the app?",
    answer: "Some strict websites might block web views or custom browsers. We include smart interception to bypass barriers on major search engines, but highly secure sites might still challenge you."
  },
  {
    question: "Can I inject my own scripts?",
    answer: "Yes! There is a setting in the app that allows you to specify custom JavaScript that will run on every page load along with the Eruda console."
  }
];

export default function FAQ() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 mb-12 text-lg">Common questions about ConsoleFlow Mobile.</p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">
            &larr; Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
