import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: '1. Data Collection',
    body:
      'ConsoleFlow Mobile is a client-side application. It does not collect, store, or transmit personal data, telemetry, cookies, or analytics. Browsing and debugging happen on your device.',
  },
  {
    title: '2. Third-Party Services',
    body:
      'The app acts as a browser wrapper. When you visit a website, that site’s own privacy policy applies. The injected Eruda console runs locally in the browser context.',
  },
  {
    title: '3. Permissions',
    body:
      'The application only needs standard Android internet access to load web pages. It does not request camera, microphone, or location permissions.',
  },
  {
    title: '4. Changes to this Policy',
    body:
      'Because the app is designed to stay data-light, the policy is unlikely to change often. If new data handling is added in the future, the policy will be updated accordingly.',
  },
];

export default function Privacy() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 pb-20 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className="mb-10 pt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white">
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to home
          </Link>

          <div className="mt-8 rounded-[34px] border border-white/8 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <Shield className="h-6 w-6 text-cyan-300" />
              </span>
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-white">Privacy Policy</h1>
                <p className="mt-2 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {sections.map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6"
            >
              <h2 className="text-xl font-semibold tracking-tight text-white">{section.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-400">{section.body}</p>
            </motion.section>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-white/8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6">
          <p className="text-sm leading-7 text-gray-400">
            The app does not use advertising identifiers or user tracking. It is built to keep the browsing and debugging loop local and simple.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
