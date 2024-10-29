import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    quickLinks: false,
    followUs: false,
    mettaMuse: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <h3 className={styles.title}>BE THE FIRST TO KNOW</h3>
          <p>Sign up for updates from mettā muse.</p>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Enter your e-mail..."
              className={styles.input}
            />
            <button className={styles.subscribeBtn}>SUBSCRIBE</button>
          </div>
        </div>

        {/* Contact & Currency Section */}
        <div className={styles.contactSection}>
          <div className={styles.desktopContact}>
            <h3 className={styles.title}>CONTACT US</h3>
            <p>+44 221 133 5360</p>
            <p>customercare@mettamuse.com</p>
          </div>

          <div className={styles.mobileContact}>
            <p>+44 221 133 5360 • customercare@mettamuse.com</p>
          </div>

          <div className={styles.currencySelector}>
            <h3 className={styles.title}>CURRENCY</h3>
            <div className={styles.currencyGroup}>
              <img src="/api/placeholder/20/20" alt="USD flag" /> USD
            </div>
            <p className={styles.currencyNote}>
              Transactions will be completed in Euros and a currency reference is available on hover.
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className={styles.linksGrid}>
          <div className={styles.linkSection}>
            <h3 className={styles.title}>mettā muse</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>About Us</li>
              <li className={styles.linkItem}>Stories</li>
              <li className={styles.linkItem}>Artisans</li>
              <li className={styles.linkItem}>Boutiques</li>
              <li className={styles.linkItem}>Contact Us</li>
              <li className={styles.linkItem}>EU Compliances Docs</li>
            </ul>
          </div>

          <div className={styles.linkSection}>
            <h3 className={styles.title}>QUICK LINKS</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>Orders & Shipping</li>
              <li className={styles.linkItem}>Join/Login as a Seller</li>
              <li className={styles.linkItem}>Payment & Pricing</li>
              <li className={styles.linkItem}>Return & Refunds</li>
              <li className={styles.linkItem}>FAQs</li>
              <li className={styles.linkItem}>Privacy Policy</li>
              <li className={styles.linkItem}>Terms & Conditions</li>
            </ul>
          </div>

          <div className={styles.linkSection}>
            <h3 className={styles.title}>FOLLOW US</h3>
            <div className={styles.socialIcons}>
              <img src="/api/placeholder/24/24" alt="Instagram" />
              <img src="/api/placeholder/24/24" alt="LinkedIn" />
            </div>
          </div>
        </div>

        {/* Mobile Accordion */}
        <div className={styles.mobileAccordion}>
          <div className={styles.accordionItem}>
            <button
              onClick={() => toggleSection('mettaMuse')}
              className={styles.accordionButton}
            >
              <span>mettā muse</span>
              <ChevronDown
                className={`${styles.chevron} ${openSections.mettaMuse ? styles.chevronOpen : ''
                  }`}
              />
            </button>
            {openSections.mettaMuse && (
              <ul className={styles.accordionContent}>
                <li className={styles.linkItem}>About Us</li>
                <li className={styles.linkItem}>Stories</li>
                <li className={styles.linkItem}>Artisans</li>
                <li className={styles.linkItem}>Boutiques</li>
                <li className={styles.linkItem}>Contact Us</li>
                <li className={styles.linkItem}>EU Compliances Docs</li>
              </ul>
            )}
          </div>

          <div className={styles.accordionItem}>
            <button
              onClick={() => toggleSection('quickLinks')}
              className={styles.accordionButton}
            >
              <span>QUICK LINKS</span>
              <ChevronDown
                className={`${styles.chevron} ${openSections.quickLinks ? styles.chevronOpen : ''
                  }`}
              />
            </button>
            {openSections.quickLinks && (
              <ul className={styles.accordionContent}>
                <li className={styles.linkItem}>Orders & Shipping</li>
                <li className={styles.linkItem}>Join/Login as a Seller</li>
                <li className={styles.linkItem}>Payment & Pricing</li>
                <li className={styles.linkItem}>Return & Refunds</li>
                <li className={styles.linkItem}>FAQs</li>
                <li className={styles.linkItem}>Privacy Policy</li>
                <li className={styles.linkItem}>Terms & Conditions</li>
              </ul>
            )}
          </div>

          <div className={styles.accordionItem}>
            <button
              onClick={() => toggleSection('followUs')}
              className={styles.accordionButton}
            >
              <span>FOLLOW US</span>
              <ChevronDown
                className={`${styles.chevron} ${openSections.followUs ? styles.chevronOpen : ''
                  }`}
              />
            </button>
            {openSections.followUs && (
              <div className={styles.accordionContent}>
                <div className={styles.socialIcons}>
                  <img src="/api/placeholder/24/24" alt="Instagram" />
                  <img src="/api/placeholder/24/24" alt="LinkedIn" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className={styles.paymentSection}>
          <h3 className={styles.title}>mettā muse ACCEPTS</h3>
          <div className={styles.paymentIcons}>
            <img src="/api/placeholder/40/24" alt="Google Pay" className={styles.paymentIcon} />
            <img src="/api/placeholder/40/24" alt="Mastercard" className={styles.paymentIcon} />
            <img src="/api/placeholder/40/24" alt="PayPal" className={styles.paymentIcon} />
            <img src="/api/placeholder/40/24" alt="American Express" className={styles.paymentIcon} />
            <img src="/api/placeholder/40/24" alt="Apple Pay" className={styles.paymentIcon} />
            <img src="/api/placeholder/40/24" alt="Shop Pay" className={styles.paymentIcon} />
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          Copyright © 2023 mettamuse. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;