import { motion } from 'framer-motion'

export function Privacy() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="prose prose-gray dark:prose-invert max-w-3xl"
    >
      <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-400">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Information We Collect</h2>
          <p>
            We collect information you provide when submitting projects, subscribing to our newsletter, or contacting us.
            This may include your email address, project details, and any other information you choose to share.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
          <p>
            We use your information to process submissions, send newsletter updates, improve our platform, and communicate with you about your submissions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with service providers (e.g., email delivery, payment processing) necessary to operate our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Cookies</h2>
          <p>
            We use cookies and similar technologies for analytics and to improve your experience. You can control cookie preferences in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data. Contact us at privacy@internetisbeautiful.io for requests.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Contact</h2>
          <p>
            For privacy-related questions, contact us at privacy@internetisbeautiful.io.
          </p>
        </section>
      </div>
    </motion.article>
  )
}
