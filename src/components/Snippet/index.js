import React from 'react';
import PropTypes from 'prop-types';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import a11yDark from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';

SyntaxHighlighter.registerLanguage('javascript', js);

const Snippet = ({ snippet }) => {
  const snippetName = Object.keys(snippet)[0];
  const snippetDetails = snippet[snippetName];
  const snippetBody = Array.isArray(snippetDetails.body)
    ? snippetDetails.body.join('\n').replace('\t', '  ')
    : snippetDetails.body;

  return (
    <div>
      <p>Name: {snippetName}</p>
      <SyntaxHighlighter language="javascript" style={a11yDark} customStyle={{ textAlign: 'left' }}>
        {snippetBody}
      </SyntaxHighlighter>
      <p>Prefix: {snippetDetails.prefix}</p>
    </div>
  );
};

Snippet.propTypes = {
  snippet: PropTypes.shape({}).isRequired,
};

export default Snippet;
