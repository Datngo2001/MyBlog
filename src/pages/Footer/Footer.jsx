import React from 'react';
import styles from './footer.module.css';

function Footer() {
  return (
    <div className={styles['container']}>
      <div className={styles['footer']}>
        <span>Copyright</span>
      </div>
    </div>
  );
}

export default Footer;
