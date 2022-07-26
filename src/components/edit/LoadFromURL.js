import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function LoadFromUrl({ onUrlLoadClick }) {
  const [url, setUrl] = useState();

  return (
    <div className="load-from-url-container">
      <p>Load image from URL</p>
      <input
        type="text"
        value={url}
        onChange={(evt) => setUrl(evt.target.value)}
      />
      <button type="button" onClick={() => onUrlLoadClick(url)}>Load</button>
    </div>
  );
}

LoadFromUrl.propTypes = {
  onUrlLoadClick: PropTypes.func,
};

LoadFromUrl.defaultProps = {
  onUrlLoadClick: () => {},
};
