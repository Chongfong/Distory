import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}

export default function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <CustomQuill theme="snow" value={value} onChange={setValue} />
  );
}
