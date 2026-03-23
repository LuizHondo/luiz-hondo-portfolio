import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Luiz Hondo",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last updated: March 23, 2026
        </p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              We collect minimal personal data necessary to provide our
              services. When you use our contact form, we collect your name,
              email address, and message content. When you use our utilities
              (such as the video converter), all processing happens locally in
              your browser — no files are uploaded to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Usage</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              The personal data collected through our contact form is used
              solely to respond to your inquiries. We do not use your data for
              marketing purposes, profiling, or automated decision-making. Usage
              analytics may be collected in anonymized form to improve the
              website experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              Contact form submissions are transmitted securely and stored only
              for the duration necessary to respond to your inquiry. We use
              industry-standard security measures to protect your data. Local
              preferences (such as theme and language settings) are stored in
              your browser&apos;s localStorage and never transmitted to our
              servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Third-Party Sharing
            </h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personal data to
              third parties. Data may be shared with service providers strictly
              necessary for the operation of this website (e.g., hosting
              provider, form processing service). These providers are bound by
              confidentiality agreements and may not use the data for any other
              purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">User Rights</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent for data processing at any time</li>
              <li>
                Lodge a complaint with a supervisory authority if you believe
                your rights have been violated
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Contact Information
            </h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              For any privacy-related inquiries, requests to exercise your
              rights, or questions about this policy, please contact us at:{" "}
              <a
                href="mailto:luiz.hondo@hotmail.com"
                className="text-primary hover:underline"
              >
                luiz.hondo@hotmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
