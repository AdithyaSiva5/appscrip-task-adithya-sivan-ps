import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4>About Us</h4>
          <p>Our story</p>
          <p>Blog</p>
          <p>Careers</p>
        </div>
        <div className={styles.section}>
          <h4>Customer Service</h4>
          <p>Contact us</p>
          <p>Shipping</p>
          <p>Returns</p>
        </div>
        <div className={styles.section}>
          <h4>Follow Us</h4>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;