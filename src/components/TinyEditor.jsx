import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { TINYMCE_API_KEY } from '../config';

const TinyEditor = ({ value, onChange, init = {}, disabled = false, height = 500 }) => {
  return (
    <Editor
      apiKey={TINYMCE_API_KEY}
      value={value}
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      onEditorChange={(content, editor) => {
        onChange(content);
      }}
      disabled={disabled}
    />
  );
};

export default TinyEditor;
