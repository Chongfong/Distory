import React
  from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import '../css/textEditor.css';

class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return;
    this.unhookEditor(this.editor);
  }
}
export default function TextEditor(
  {
    diaryContentValue, setDiaryContentValue,
    textEditorRef, setTextEditorCursorIndex,
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
          setTextEditorCursorIndex(textEditorRef
            ?.current?.editor?.selection?.savedRange?.index);
        }
}
    />
  );
}

TextEditor.propTypes = {
  diaryContentValue: PropTypes.string,
  setDiaryContentValue: PropTypes.func,
  textEditorRef: PropTypes.string,
  setTextEditorCursorIndex: PropTypes.func,
};

TextEditor.defaultProps = {
  diaryContentValue: '',
  setDiaryContentValue: () => {},
  textEditorRef: '',
  setTextEditorCursorIndex: () => {},
};
