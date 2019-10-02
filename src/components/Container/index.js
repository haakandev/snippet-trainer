import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Container.module.css';

const Container = ({ children, center }) => {
  return (
    <div className={clsx(styles.container, { [styles.centerVertically]: center })}>{children}</div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.bool,
};

Container.defaultProps = {
  center: false,
};

export default Container;
