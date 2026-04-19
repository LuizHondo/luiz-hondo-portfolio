import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - Luiz Hondo",
  robots: { index: false, follow: false },
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Use</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 19, 2026</p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              By accessing or using this website and its connected tools, you
              agree to these Terms of Use. If you do not agree, please do not
              use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              You may use this website and its features only for lawful
              purposes. You agree not to misuse the platform, interfere with its
              normal operation, or attempt unauthorized access to any systems or
              data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Facebook Integration</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              If you connect through Facebook features, you are responsible for
              complying with Facebook&apos;s own terms and policies. We only
              request the permissions necessary for the intended functionality
              and do not sell your Facebook data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              All content, branding, code, and materials on this website are
              owned by Luiz Hondo unless otherwise stated. You may not copy,
              distribute, or commercially exploit any part of this website
              without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              Services are provided on an &quot;as is&quot; and
              &quot;as available&quot; basis, without warranties of any kind,
              express or implied. We do not guarantee uninterrupted,
              error-free, or fully secure operation at all times.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              To the fullest extent permitted by law, Luiz Hondo is not liable
              for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of this website or related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              We may update these Terms of Use from time to time. Continued use
              of the website after updates are posted constitutes acceptance of
              the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-body leading-relaxed text-muted-foreground">
              For any questions regarding these Terms of Use, please contact:{" "}
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
