import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is ConsoleFlow Mobile?',
    answer:
      'It is a lightweight Android browser built for debugging and quick checks on mobile.',
  },
  {
    question: 'Do I need to root my device?',
    answer: 'No. It works on standard Android devices without root access.',
  },
  {
    question: 'Does it work on iOS?',
    answer: 'At the moment, ConsoleFlow is only available for Android through APK download.',
  },
  {
    question: 'Why do some websites behave differently?',
    answer:
      'Some strict websites block WebView-based browsers or custom user agents. ConsoleFlow handles common cases, but highly protected sites can still resist it.',
  },
  {
    question: 'Can I run my own scripts?',
    answer:
      'Yes. You can add custom JavaScript that runs on page load for your own testing workflow.',
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pb-20 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="mb-10 pt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white">
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to home
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-400">
                <HelpCircle className="h-3.5 w-3.5 text-cyan-300" />
                Questions
              </span>
              <h1 className="max-w-sm text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Frequently asked questions
              </h1>
              <p className="max-w-md text-base leading-7 text-gray-400">
                A short reference for how the app behaves, what it supports, and where the limits are.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.article
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300/80" />
                    <h2 className="text-lg font-semibold tracking-tight text-white">{faq.question}</h2>
                  </div>
                  <p className="pl-5 text-sm leading-7 text-gray-400">{faq.answer}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
