import React from 'react';
import PropTypes from 'prop-types';

const Snippet = ({ snippet }) => {
  const snippetName = Object.keys(snippet)[0];
  const snippetDetails = snippet[snippetName];

  return (
    <div>
      <p>Name: {snippetName}</p>
      <p>Prefix: {snippetDetails.prefix}</p>
      {snippetDetails.description && <p>Description: {snippetDetails.description}</p>}
      <p>Body:</p>
      <code style={{ flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'left' }}>
        {Array.isArray(snippetDetails.body)
          ? snippetDetails.body.map(line => <pre>{line}</pre>)
          : snippetDetails.body}
      </code>
    </div>
  );
};

Snippet.propTypes = {
  snippet: PropTypes.shape({}).isRequired,
};

export default Snippet;
