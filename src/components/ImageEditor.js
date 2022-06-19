import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React, { useRef } from 'react';
import LoadFromUrl from './LoadFromURL';
import myTheme from './imageEditorTheme';

export default function PhotoEditor() {
  const editorRef = useRef();
  const loadFromUrl = (url) => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.loadImageFromURL(url, 'image');
  };

  const logImageContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const dataURL = editorInstance.toDataURL();
    console.log(dataURL);
  };

  return (
    <>
      <LoadFromUrl onUrlLoadClick={(url) => loadFromUrl(url)} />
      <ImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: 'https://i1.wp.com/www.sozailab.jp/db_img/sozai/49644/5d3e6234c3eab5203aad1df111f90f5d.png',
            name: 'SampleImage',
          },
          theme: myTheme,
          menu: [
            'crop',
            'flip',
            'rotate',
            'draw',
            'shape',
            'icon',
            'text',
            'mask',
            'filter',
          ],
          initMenu: 'filter',
          uiSize: {
            width: '1000px',
            height: '700px',
          },
          menuBarPosition: 'bottom',
          cssMaxWidth: 700,
          cssMaxHeight: 500,
          selectionStyle: {
            cornerSize: 20,
            rotatingPointOffset: 70,
          },
          usageStatistics: false,
        }}
      />
      <button type="button" onClick={logImageContent}>Get URL </button>
    </>
  );
}
