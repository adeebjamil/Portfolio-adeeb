'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionTitle from '../UI/SectionTitle';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/adeebjamil',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#ffffff',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/adeeb-jamil-6540b6215',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'Email',
    url: 'mailto:adeebjamil6459@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#64FFDA',
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd0175010-ef1f-4317-ad40-9c2b0e6ae8da',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: 'Portfolio Contact Form',
          subject: `New Contact from ${formData.name}`,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#64FFDA]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#64FFDA]/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <SectionTitle title="Get In Touch" subtitle="// Contact Me" />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left - Info */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-3 sm:mb-4">
                Let&apos;s work together
              </h3>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              <motion.a
                href="mailto:adeebjamil6459@gmail.com"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass hover:bg-white/5 transition-colors group"
                whileHover={{ x: 10 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#64FFDA]/10 flex items-center justify-center group-hover:bg-[#64FFDA]/20 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500">Email</p>
                  <p className="text-text text-sm sm:text-base group-hover:text-[#64FFDA] transition-colors truncate">adeebjamil6459@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+918409528159"
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass hover:bg-white/5 transition-colors group"
                whileHover={{ x: 10 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#64FFDA]/10 flex items-center justify-center group-hover:bg-[#64FFDA]/20 transition-colors flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                  <p className="text-text text-sm sm:text-base group-hover:text-[#64FFDA] transition-colors">+91 8409528159</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Status</p>
                  <p className="text-green-400 text-sm sm:text-base">Available for work</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">Connect with me</p>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text transition-colors group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    style={{
                      '--hover-color': social.color,
                    } as React.CSSProperties}
                  >
                    <span className="group-hover:text-[var(--hover-color)] transition-colors">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Name Input */}
            <div className="relative">
              <motion.input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl glass bg-transparent text-text placeholder-transparent focus:outline-none peer text-sm sm:text-base"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className={`absolute left-4 sm:left-6 transition-all duration-300 pointer-events-none text-sm sm:text-base ${
                  focusedField === 'name' || formData.name
                    ? 'top-0 -translate-y-1/2 text-xs text-[#64FFDA] bg-[#0A192F] px-2'
                    : 'top-1/2 -translate-y-1/2 text-gray-500'
                }`}
              >
                Your Name
              </label>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#64FFDA] to-[#64FFDA]"
                initial={{ width: '0%' }}
                animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <motion.input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl glass bg-transparent text-text placeholder-transparent focus:outline-none peer text-sm sm:text-base"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 sm:left-6 transition-all duration-300 pointer-events-none text-sm sm:text-base ${
                  focusedField === 'email' || formData.email
                    ? 'top-0 -translate-y-1/2 text-xs text-[#64FFDA] bg-[#0A192F] px-2'
                    : 'top-1/2 -translate-y-1/2 text-gray-500'
                }`}
              >
                Your Email
              </label>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#64FFDA] to-[#64FFDA]"
                initial={{ width: '0%' }}
                animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Message Input */}
            <div className="relative">
              <motion.textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl glass bg-transparent text-text placeholder-transparent focus:outline-none peer resize-none text-sm sm:text-base"
                placeholder="Message"
              />
              <label
                htmlFor="message"
                className={`absolute left-4 sm:left-6 transition-all duration-300 pointer-events-none text-sm sm:text-base ${
                  focusedField === 'message' || formData.message
                    ? 'top-0 -translate-y-1/2 text-xs text-[#64FFDA] bg-[#0A192F] px-2'
                    : 'top-6 text-gray-500'
                }`}
              >
                Your Message
              </label>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#64FFDA] to-[#64FFDA]"
                initial={{ width: '0%' }}
                animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg relative overflow-hidden group transition-all ${
                isSubmitting 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : submitStatus === 'success'
                  ? 'bg-green-500 text-white'
                  : submitStatus === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-accent text-primary hover:bg-accent/90'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Failed - Try Again
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>

            {/* Status Message */}
            {submitStatus === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-center text-sm"
              >
                Thanks for reaching out! I&apos;ll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
