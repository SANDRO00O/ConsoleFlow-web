import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
        </div>

        <div className="prose prose-invert prose-gray max-w-none prose-p:leading-relaxed">
          <p className="text-lg text-gray-300">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Data Collection</h2>
          <p className="text-gray-400">
            ConsoleFlow Mobile is a client-side application. We do not collect, process, track, or store personal data, usage telemetry, cookies, or analytics from this website.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Third-Party Services</h2>
          <p className="text-gray-400">
            The site reads release metadata from GitHub and downloads APK files through Cloudflare. Those requests are limited to the project release data and file transfer needed to deliver updates.
          </p>
          <p className="text-gray-400 mt-4">
            The app utilizes <a href="https://github.com/liriliri/eruda" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-white/20">Eruda</a> as an injected web console. Eruda runs locally inside the browser session.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Permissions</h2>
          <p className="text-gray-400">
            The application only requests the standard Android internet permission to load web pages. It does not request access to your location, camera, microphone, or contacts.
          </p>

          <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Changes to this Policy</h2>
          <p className="text-gray-400">
            If the site ever adds analytics or other data collection features in the future, this policy will be updated to match. That is not planned.
          </p>

          <div className="mt-12 pt-8 border-t border-white/10">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
