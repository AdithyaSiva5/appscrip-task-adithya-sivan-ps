import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { Search, Heart, ShoppingBag, User, Menu } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top banner */}
      <div className={styles.topBanner}>
        <div className={styles.bannerContent}>
          <span>Lorem ipsum dolor</span>
          <span>Lorem ipsum dolor</span>
          <span>Lorem ipsum dolor</span>
        </div>
      </div>

      <div className={styles.mainHeader}>
        {/* Mobile menu button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>☘</div>
          <div className={styles.logoText}>LOGO</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <Link href="/shop">SHOP</Link>
          <Link href="/skills">SKILLS</Link>
          <Link href="/stories">STORIES</Link>
          <Link href="/about">ABOUT</Link>
          <Link href="/contact">CONTACT US</Link>
        </nav>

        {/* Icons */}
        <div className={styles.icons}>
          <button><Search size={20} /></button>
          <button><Heart size={20} /></button>
          <button><ShoppingBag size={20} /></button>
          <button><User size={20} /></button>
          <select className={styles.langSelect}>
            <option value="en">ENG</option>
            <option value="es">ESP</option>
          </select>
        </div>

        {/* Mobile Navigation */}
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