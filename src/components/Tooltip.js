import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const StyledTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const CustomTooltip = ({ placement, content, children }) => (
  <StyledTooltip placement={placement} title={content}>
    {children}
  </StyledTooltip>
);

CustomTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  content: PropTypes.node.isRequired,
};

CustomTooltip.defaultProps = {
  placement: 'top',
};

export default CustomTooltip;
