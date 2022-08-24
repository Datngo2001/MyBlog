import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

function RichTextEditor({ init = '', placeholder, handleBlur }) {
  const editor = useRef(null);
  const [content, setContent] = useState(init);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={{
        readonly: false,
        placeholder: placeholder || 'Start typings...'
      }}
      tabIndex={1}
      onBlur={(newContent) => {
        setContent(newContent);
        handleBlur(newContent);
      }}
      onChange={() => {}}
    />
  );
}

export default React.memo(RichTextEditor);
