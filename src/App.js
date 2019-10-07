/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './App.module.css';
import Game from './containers/Game';
import Home from './containers/Home';
import defaultSnippets from './defaultSnippets';

const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
const valueIsType = (value, type, arraysAllowed = false) => {
  // If value is an array, check that the nested values matches the type
  if (arraysAllowed && Array.isArray(value)) {
    return value.every(nestedValue => valueIsType(nestedValue, type, true));
  }

  // If not an array
  switch (type) {
    case 'array':
      return Array.isArray(value);
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object';
    default:
      return false;
  }
};
const hasPropertyOfType = (obj, prop, type, arraysAllowed = false) =>
  hasProperty(obj, prop) && valueIsType(obj[prop], type, arraysAllowed);

const App = () => {
  const [isGameActive, setGameActive] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length !== 1) {
      setFileError('Currently only supporting selecting one snippet file at a time.');
      return;
    }

    const reader = new FileReader();

    reader.onabort = () => setFileError('File reading was aborted');
    reader.onerror = () => setFileError('File reading has failed');
    reader.onload = () => {
      setCurrentFile(null);
      setFileError('');
      try {
        const snippets = JSON.parse(reader.result);
        if (
          Object.values(snippets).some(
            value =>
              typeof value !== 'object' ||
              !hasPropertyOfType(value, 'prefix', 'string', true) ||
              !hasPropertyOfType(value, 'body', 'string', true)
          )
        ) {
          throw new Error(
            'The imported JSON file contains snippet(s) without the required properties.\nReuired properties:\n - prefix: string\n - body: string or array of strings'
          );
        }
        setCurrentFile({
          name: acceptedFiles[0].name,
          content: snippets,
        });
      } catch (error) {
        if (error.name === 'SyntaxError') {
          setFileError('File is invalid JSON');
        } else {
          setFileError(error.message);
        }
      }
    };

    reader.readAsText(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isGameActive) {
    const fastestScore = localStorage.getItem('fastestScore');
    return (
      <div className={styles.app}>
        <div className={styles.dropZone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the snippets file here ...</p>
          ) : (
            <p>Drag &apos;n&apos; drop a snippet file (JSON) here, or click to select file</p>
          )}
        </div>
        {!!fileError && <p>{fileError}</p>}
        {!!currentFile && <p>Current snippet file: {currentFile.name}</p>}
        <Home onStart={() => setGameActive(true)} />
        <h5
          className={styles.highscore}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >{`Highscore: ${Math.floor(fastestScore / 3600)}:${`0${Math.floor(
          fastestScore / 60
        )}`.slice(-2)}:${`0${Math.floor(fastestScore % 60)}`.slice(-2)}`}</h5>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Game
        snippetsFile={currentFile || { name: 'Default React snippets', content: defaultSnippets }}
        onEnd={() => setGameActive(false)}
      />
    </div>
  );
};

export default App;
