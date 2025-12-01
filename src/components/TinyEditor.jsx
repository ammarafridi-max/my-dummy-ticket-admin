import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_API_KEY } from '../config';

export default function TinyEditor({ value, disabled = false, editorRef }) {
  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.setContent(value);
    }
  }, [value, editorRef]);

  return (
    <Editor
      apiKey={TINYMCE_API_KEY}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      initialValue={value} // Add this for initial content
      init={{
        height: 500,
        menubar: false,
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      disabled={disabled}
    />
  );
}
