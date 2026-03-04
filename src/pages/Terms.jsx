import { motion } from 'framer-motion'

export function Terms() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="prose prose-gray dark:prose-invert max-w-3xl"
    >
      <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
        Terms of Service
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-400">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Acceptance</h2>
          <p>
            By using Internet Is Beautiful, you agree to these Terms of Service. If you do not agree, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Use of Service</h2>
          <p>
            You may submit projects for curation, subscribe to our newsletter, and use our platform for lawful purposes only.
            You are responsible for the accuracy of submissions and for ensuring you have rights to the content you submit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Submissions</h2>
          <p>
            We reserve the right to approve, reject, or remove any submission at our discretion. Submission does not guarantee inclusion.
            By submitting, you grant us a license to display and promote your project on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Payments</h2>
          <p>
            Fast-track submission fees are non-refundable once processing has begun. Refunds may be considered on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Limitation of Liability</h2>
          <p>
            Internet Is Beautiful is provided "as is." We are not liable for any damages arising from your use of the platform or third-party content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Contact</h2>
          <p>
            For questions about these terms, contact us at legal@internetisbeautiful.io.
          </p>
        </section>
      </div>
    </motion.article>
  )
}
