import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import { Container } from '../components';
import logo from '../assets/logo.svg';

const Home = ({ onStart }) => {
  return (
    <Container center>
      <img src={logo} className={styles.homeLogo} alt="logo" />
      <button type="button" className={styles.homeButton} onClick={onStart}>
        Start Training
      </button>
    </Container>
  );
};

Home.propTypes = {
  onStart: PropTypes.func.isRequired,
};

export default Home;
