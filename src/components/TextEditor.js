/* eslint-disable no-param-reassign */
import React
  from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
// import 'react-quill/dist/quill.snow.css';
import '../css/textEditor.css';

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}
export default function TextEditor(
  {
    diaryContentValue, setDiaryContentValue, textEditorRef, textEditorCursorIndex,
  },
) {
  const modules = {
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ align: [] }],

      ['link', 'video'],

      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <CustomQuill
      theme="snow"
      ref={textEditorRef}
      value={diaryContentValue}
      modules={modules}
      onChange={
        (contentValue) => {
          setDiaryContentValue(contentValue);
          textEditorCursorIndex.current = textEditorRef.current.editor.getSelection().index;
        }
}
    />
  );
}

TextEditor.propTypes = {
  diaryContentValue: PropTypes.string,
  setDiaryContentValue: PropTypes.func,
  textEditorRef: PropTypes.string,
  textEditorCursorIndex: PropTypes.string,
};

TextEditor.defaultProps = {
  diaryContentValue: '',
  setDiaryContentValue: () => {},
  textEditorRef: '',
  textEditorCursorIndex: '',
};
