import React from 'react';
import styles from './Home.module.css';
import logo from '../assets/logo.svg';

const Home = ({ onStart }) => {
  return (
    <div className={styles.home}>
      <img src={logo} className={styles.homeLogo} alt="logo" />
      <button type="button" className={styles.homeButton} onClick={onStart}>
        Start Training
      </button>
    </div>
  );
};

export default Home;
