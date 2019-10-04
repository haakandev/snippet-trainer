import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import { Container } from '../components';

const Home = ({ onStart }) => {
  return (
    <Container center>
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
