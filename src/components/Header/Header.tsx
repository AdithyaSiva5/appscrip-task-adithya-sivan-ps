import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';
import logo from "../../../public/images/Logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBanner}>
        <div className={styles.bannerContent}>
          <span>Lorem ipsum dolor</span>
          <span>Lorem ipsum dolor</span>
          <span>Lorem ipsum dolor</span>
        </div>
      </div>

      <div className={styles.mainHeader}>
        <div className={styles.headerTop}>
          <div className={styles.leftSection}>
            <button className={styles.mobileMenuButton} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu size={24} />
            </button>
            <div className={styles.logoIcon}>
              <Image
                src={logo}
                alt="Logo"
              />
            </div>
          </div>

          <div className={styles.centerSection}>
            <Link href="/" className={styles.logoText}>
              LOGO
            </Link>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.icons}>
              <button className={styles.iconSearch}><Search size={20} /></button>
              <button><Heart size={20} /></button>
              <button><ShoppingBag size={20} /></button>
              <button><User size={20} /></button>
              <select className={styles.langSelect}>
                <option value="en">ENG</option>
                <option value="es">ESP</option>
              </select>
            </div>
          </div>
        </div>

        <nav className={styles.mainNav}>
          <Link href="/shop">SHOP</Link>
          <Link href="/skills">SKILLS</Link>
          <Link href="/stories">STORIES</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/contact">CONTACT US</Link>
        </nav>

        {isMobileMenuOpen && (
          <div className={styles.mobileNav}>
            <Link href="/shop">SHOP</Link>
            <Link href="/skills">SKILLS</Link>
            <Link href="/stories">STORIES</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/contact">CONTACT US</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;