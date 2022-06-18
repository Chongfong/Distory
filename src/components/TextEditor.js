import React
  from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}
export default function TextEditor({ diaryContentValue, setDiaryContentValue }) {
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ align: [] }],

      ['link', 'image', 'video'],

      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <CustomQuill theme="snow" value={diaryContentValue} modules={modules} onChange={setDiaryContentValue} />
  );
}

TextEditor.propTypes = {
  diaryContentValue: PropTypes.string,
  setDiaryContentValue: PropTypes.func,
};

TextEditor.defaultProps = {
  diaryContentValue: '',
  setDiaryContentValue: () => {},
};
