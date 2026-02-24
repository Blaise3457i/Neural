export function Privacy() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white mb-12">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We collect information that you provide directly to us, such as when you fill out a contact form or subscribe to our newsletter. This may include your name, email address, and any other information you choose to provide. We also automatically collect certain information when you visit our website, including your IP address, browser type, and operating system, through the use of analytics tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">2. Cookies Usage</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              AI Free Hub uses cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences and understand how you interact with our site. You can choose to disable cookies through your browser settings, but this may affect the functionality of some parts of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">3. Google AdSense & Third-Party Advertising</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Google Ad Settings</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">4. Data Protection</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We take the security of your data seriously and implement appropriate technical and organizational measures to protect it against unauthorized access, loss, or misuse. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">5. External Links Disclaimer</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our website contains links to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies. We encourage you to review the privacy policy of every site you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">6. User Rights</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete the information we hold about you. If you wish to exercise any of these rights, please contact us using the information provided below.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-4">7. Contact Information</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <a href="mailto:ublaise775@gmail.com" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
              ublaise775@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
